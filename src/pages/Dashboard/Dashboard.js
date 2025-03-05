import React, {useEffect, useState} from 'react';
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

const useActiveTab = (initialTab = 'pendingReservations', setAllReservations, setOpeningHours, setPendingReservation, setTables, setEmployees) => {
    const [activeTab, setActiveTab] = useState(initialTab);

    useEffect(() => {
        console.log(`Active tab changed to: ${activeTab}`);

        const fetchData = async () => {
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
        };

        fetchData();
    }, [activeTab, setAllReservations]);

    return [activeTab, setActiveTab];
};

const RestaurantDashboard = () => {
    const [allReservations, setAllReservations] = useState([]);
    const [openingHours, setOpeningHours] = useState([]);
    const [pendingReservations, setPendingReservations] = useState([]);
    const [tables, setTables] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [activeTab, setActiveTab] = useActiveTab('pendingReservations', setAllReservations, setOpeningHours, setPendingReservations, setTables, setEmployees);
    const [editingHours, setEditingHours] = useState(false);


    const handleApproveReservation = async (id) => {
        pendingReservations.find((res) => res.id === id);
        const updatedPending = pendingReservations.filter((res) => res.id !== id);

        setPendingReservations(updatedPending);

        try {
            await reservationService.confirm(id);
        } catch (e) {
            console.log(e);
        }

        setAllReservations((prevReservations) =>
            prevReservations.map((res) =>
                res.id === id ? {...res, status: 'confirmed'} : res
            )
        );
    };

    const handleRejectReservation = async (id) => {
        const updatedPending = pendingReservations.filter((res) => res.id !== id);
        setPendingReservations(updatedPending);

        try {
            await reservationService.cancel(id);
        } catch (e) {
            console.log(e);
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

    const toggleEditMode = () => {
        setEditingHours(!editingHours);
    };

    const saveHours = async () => {
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

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} pendingReservations={pendingReservations}/>
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header activeTab={activeTab} editingHours={editingHours} toggleEditMode={toggleEditMode}/>
                <main className="flex-1 overflow-y-auto p-6">
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
                            <FloorPlanDesigner tableList={tables}/>
                        </>
                    )}
                    {activeTab === 'employees' && (
                        <EmployeeManagement
                            employees={employees}
                            handleRemoveEmployee={handleRemoveEmployee}
                            createNewEmployee={createNewEmployee}
                            updateEmployeeRole={updateEmployeeRole}
                        />
                    )}
                    {activeTab === 'allReservations' && (
                        <AllReservations
                            allReservations={allReservations}
                            getTableName={getTableName}
                        />
                    )}
                </main>
            </div>
        </div>
    );
};

export default RestaurantDashboard;