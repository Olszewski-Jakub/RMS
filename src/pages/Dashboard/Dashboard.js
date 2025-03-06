import React, {useEffect, useState} from 'react';
import {useLocation, useParams} from 'react-router-dom';
import Sidebar from '../../components/Dashboard/Sidebar/Sidebar';
import Header from '../../components/Dashboard/Header/Header';
import PendingReservations from '../../components/Dashboard/PendingReservations/PendingReservations';
import OpeningHours from '../../components/Dashboard/OpeningHours/OpeningHours';
import EmployeeManagement from '../../components/Dashboard/EmployeeManagement/EmployeeManagement';
import AllReservations from '../../components/Dashboard/AllReservations/AllReservations';
import FloorPlanDesigner from '../../components/Dashboard/FloorPlanDesigner/FloorPlanDesigner';
import reservationService from '../../services/reservation.service';
import openingHoursService from "../../services/openingHours.service";
import tableService from "../../services/table.service";
import userService from "../../services/user.service";
import './Dashboard.css';
import authService from "../../services/auth.service";
import LoadingIndicator from '../../components/Dashboard/Loading/LoadingIndicator';


const useActiveTab = (initialTab = 'pendingReservations', setAllReservations, setOpeningHours, setPendingReservation, setTables, setEmployees, setLoading) => {
    const [activeTab, setActiveTab] = useState(initialTab);

    useEffect(() => {
        const hash = window.location.hash.replace('#', '');
        if (hash && ['pendingReservations', 'hours', 'tables', 'employees', 'allReservations'].includes(hash)) {
            setActiveTab(hash);
        } else {
            window.location.hash = initialTab;
        }
    }, []);

    const handleTabChange = (newTab) => {
        if (window.location.hash !== `#${newTab}`) {
            window.location.hash = newTab;
        }
        setActiveTab(newTab);
    };

    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.replace('#', '');
            if (hash && hash !== activeTab) {
                setActiveTab(hash);
            }
        };

        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, [activeTab]);

    useEffect(() => {
        console.log(`Active tab changed to: ${activeTab}`);

        const fetchData = async () => {
            setLoading(true);

            try {
                switch (activeTab) {
                    case 'allReservations':
                        try {
                            const allReservationResponse = await reservationService.getAll();
                            const refactoredReservations = allReservationResponse.map(reservation => {
                                const start = new Date(reservation.startTime);
                                const end = new Date(reservation.endTime);
                                return {
                                    ...reservation,
                                    date: start.toISOString().split('T')[0],
                                    startTime: start.toISOString().split('T')[1].split('.')[0],
                                    endTime: end.toISOString().split('T')[1].split('.')[0],
                                };
                            });
                            setAllReservations(refactoredReservations);
                        } catch (error) {
                            console.error('Failed to fetch all reservations:', error);
                        }
                        break;
                    case "hours":
                        try {
                            const openingHoursReposne = await openingHoursService.getAll();
                            const hours = [];
                            for (const h of openingHoursReposne) {
                                h.isOpen = h.startTime != null && h.endTime != null;
                                hours.push(h);
                            }
                            setOpeningHours(hours);
                        } catch (error) {
                            console.error('Failed to fetch opening hours:', error);
                        }
                        break;
                    case "pendingReservations":
                        try {
                            const pendingReservationResponse = await reservationService.getByStatus("pending");
                            const refactoredReservations = pendingReservationResponse.map(reservation => {
                                const start = new Date(reservation.startTime);
                                const end = new Date(reservation.endTime);
                                return {
                                    ...reservation,
                                    date: start.toISOString().split('T')[0],
                                    startTime: start.toISOString().split('T')[1].split('.')[0],
                                    endTime: end.toISOString().split('T')[1].split('.')[0],
                                };
                            });
                            setPendingReservation(refactoredReservations);
                        } catch (e) {
                            console.log(e);
                        }
                        break;
                    case "tables":
                        try {
                            const tables = await tableService.getAll();
                            setTables(tables);
                        } catch (e) {
                            console.log(e);
                        }
                        break;
                    case "employees":
                        try {
                            const employees = await userService.getAllPrivilegedUsers();
                            setEmployees(employees);
                        } catch (e) {
                            console.log(e);
                        }
                    default:
                        console.log(activeTab);
                        break;
                }
            } finally {
                setLoading(false); // Set loading to false after data is fetched
            }
        };

        fetchData();
    }, [activeTab, setAllReservations]);

    return [activeTab, handleTabChange];
};

const RestaurantDashboard = () => {
    const {tab} = useParams();
    const location = useLocation();
    const [allReservations, setAllReservations] = useState([]);
    const [openingHours, setOpeningHours] = useState([]);
    const [pendingReservations, setPendingReservations] = useState([]);
    const [tables, setTables] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false); // Add loading state
    const [activeTab, setActiveTab] = useActiveTab(tab || 'pendingReservations', setAllReservations, setOpeningHours, setPendingReservations, setTables, setEmployees, setLoading);
    const [editingHours, setEditingHours] = useState(false);
    const [tablesEditMode, setTablesEditMode] = useState(false);
    const [addEmployee, setAddEmployee] = useState(false);
    const [reservationFilterMode, setReservationFilterMode] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    // Set default route on initial load if no tab is specified
    useEffect(() => {
        if (!tab && location.pathname === '/dashboard') {
            setActiveTab('pendingReservations');
        }
    }, [location, tab]);

    // Listen for sidebar collapse state changes
    const handleSidebarToggle = (isCollapsed) => {
        setSidebarCollapsed(isCollapsed);
    };

    const handleApproveReservation = async (id) => {
        setLoading(true);
        pendingReservations.find((res) => res.id === id);
        const updatedPending = pendingReservations.filter((res) => res.id !== id);

        setPendingReservations(updatedPending);

        try {
            await reservationService.confirm(id);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }

        setAllReservations((prevReservations) =>
            prevReservations.map((res) =>
                res.id === id ? {...res, status: 'confirmed'} : res
            )
        );
    };

    const approveAllReservations = async () => {
        setLoading(true);
        const updatedPending = pendingReservations.filter((res) => res.status !== 'pending');
        setPendingReservations(updatedPending);

        try {
            for (const res of pendingReservations) {
                await handleApproveReservation(res.id);
                await new Promise(resolve => setTimeout(resolve, 2000)); // 2 seconds delay
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    const handleRejectReservation = async (id) => {
        setLoading(true);
        const updatedPending = pendingReservations.filter((res) => res.id !== id);
        setPendingReservations(updatedPending);

        try {
            await reservationService.cancel(id);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }

        setAllReservations((prevReservations) =>
            prevReservations.map((res) =>
                res.id === id ? {...res, status: 'Cancelled'} : res
            )
        );
    };

    const handleHoursChange = (dayId, field, value) => {
        setOpeningHours((prevHours) =>
            prevHours.map((day) =>
                day.dayId === dayId ? {...day, [field]: value} : day
            )
        );
    };

    const handleToggleDay = (dayId) => {
        setOpeningHours((prevHours) =>
            prevHours.map((hours) =>
                hours.dayId === dayId ? {...hours, isOpen: !hours.isOpen} : hours
            )
        );
    };

    const toggleHoursEditMode = () => {
        setEditingHours(!editingHours);
    };

    const toggleTablesEditMode = () => {
        setTablesEditMode(!tablesEditMode);
    }

    const saveHours = async () => {
        setLoading(true);
        setEditingHours(false);
        try {
            for (const hour of openingHours) {
                if (hour.isOpen === false) {
                    hour.startTime = null;
                    hour.endTime = null;
                }
                await openingHoursService.update(hour.dayId, hour.startTime, hour.endTime, hour.day);
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveEmployee = async (id) => {
        if (window.confirm('Are you sure you want to remove this employee?')) {
            try {
                await authService.deleteEmployee(id);
                setEmployees((prevEmployees) => prevEmployees.filter((emp) => emp.uid !== id));
            } catch (e) {
                console.log(e);
            }
        }
    };

    const createNewEmployee = async (employee) => {
        try {
            if (employee.role === "owner") {
                await authService.createOwner(employee);
                setTimeout(async () => {
                    const users = await userService.getAllPrivilegedUsers();
                    setEmployees(users);
                }, 2000); // 2 seconds delay
            } else if (employee.role === "employee") {
                await authService.createEmployee(employee);
                setTimeout(async () => {
                    const users = await userService.getAllPrivilegedUsers();
                    setEmployees(users);
                }, 2000); // 2 seconds delay
            }
        } catch (e) {
            console.log(e);
        }
    };

    const updateEmployeeRole = async (id, role) => {
        try {
            await userService.changePrivilege(id, role);
            const users = await userService.getAllPrivilegedUsers();
            setEmployees(users);
        } catch (e) {
            console.log(e);
        }
    }

    const getTableName = (tableId) => {
        const table = tables.find((t) => t.id === tableId);
        return table ? table.name : 'Unassigned';
    };

    const toggleAddEmployee = () => {
        setAddEmployee(!addEmployee);
    }

    const toggleReservationFilterMode = () => {
        setReservationFilterMode(!reservationFilterMode);
    }

    const [messageData, setMessageData] = useState(null);

    useEffect(() => {
        // Establish the WebSocket connection
        const ws = new WebSocket('wss://rms.bushive.app'); // Replace with your WebSocket URL

        ws.onopen = () => {
            console.log('WebSocket connected');
        };

        ws.onmessage = (event) => {
            // Parse the incoming message
            const parsedMessage = JSON.parse(event.data);

            // Extract the 'data' field from the message and store it in the state
            if (parsedMessage && parsedMessage.data) {
                console.log('Received message:', parsedMessage.data);

                switch (activeTab) {
                    case 'pendingReservations':
                        // Check if ID is in pending reservations
                        const id = parsedMessage.data.id;
                        const reservation = pendingReservations.find((res) => res.id === id);
                        console.log(parsedMessage.data);
                        if (!reservation) {
                            const startTime = new Date(parsedMessage.data.startTime * 1000);
                            const endTime = new Date(parsedMessage.data.endTime * 1000);
                            const newReservation = {
                                ...parsedMessage.data,
                                startTime: startTime.toISOString().split('T')[1].split('.')[0], // Extract time part
                                endTime: endTime.toISOString().split('T')[0], // Extract date part
                                date: startTime.toISOString().split('T')[0] // Extract date part
                            };
                            setPendingReservations((prevReservations) => {
                                const reservationMap = new Map(prevReservations.map(res => [res.id, res]));
                                reservationMap.set(id, newReservation);
                                return Array.from(reservationMap.values());
                            });
                        }
                        break;
                }

            }
        };

        ws.onerror = (error) => {
            console.error('WebSocket Error: ', error);
        };

        ws.onclose = () => {
            console.log('WebSocket disconnected');
        };

        // Cleanup WebSocket connection when the component is unmounted
        return () => {
            ws.close();
        };
    }, []);

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                pendingReservations={pendingReservations}
                onToggle={handleSidebarToggle}
            />
            <div className={`main-content ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
                <Header
                    activeTab={activeTab}
                    editingHours={editingHours}
                    toggleHoursEditMode={toggleHoursEditMode}
                    tablesEditMode={tablesEditMode}
                    toggleTablesEditMode={toggleTablesEditMode}
                    approveAllReservations={approveAllReservations}
                    toggleAddEmployee={toggleAddEmployee}
                    toggleShowFilters={toggleReservationFilterMode}
                />
                <main className="dashboard-content overflow-y-auto p-6">
                    {loading ? (
                        <LoadingIndicator text={`Loading ${activeTab.replace(/([A-Z])/g, ' $1').trim()}...`}/>
                    ) : (
                        <>
                            {activeTab === 'pendingReservations' && (
                                <PendingReservations
                                    pendingReservations={pendingReservations}
                                    handleApproveReservation={handleApproveReservation}
                                    handleRejectReservation={handleRejectReservation}
                                    getTableName={getTableName}
                                />
                            )}
                            {activeTab === 'hours' && (
                                <OpeningHours
                                    openingHours={openingHours}
                                    editingHours={editingHours}
                                    handleHoursChange={handleHoursChange}
                                    handleToggleDay={handleToggleDay}
                                    saveHours={saveHours}
                                />
                            )}
                            {activeTab === 'tables' && (
                                <>
                                    <FloorPlanDesigner editMode={tablesEditMode}/>
                                </>
                            )}
                            {activeTab === 'employees' && (
                                <EmployeeManagement
                                    employees={employees}
                                    handleRemoveEmployee={handleRemoveEmployee}
                                    createNewEmployee={createNewEmployee}
                                    updateEmployeeRole={updateEmployeeRole}
                                    showDialog={addEmployee}
                                    setShowDialog={setAddEmployee}
                                />
                            )}
                            {activeTab === 'allReservations' && (
                                <AllReservations
                                    allReservations={allReservations}
                                    getTableName={getTableName}
                                    setFiltersVisible={setReservationFilterMode}
                                    filtersVisible={reservationFilterMode}
                                />
                            )}
                        </>
                    )}
                </main>
            </div>
        </div>
    );
};

export default RestaurantDashboard;