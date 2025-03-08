import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import './Dashboard.css';

// Components
import Sidebar from '../../components/Dashboard/Sidebar/Sidebar';
import Header from '../../components/Dashboard/Header/Header';
import PendingReservations from '../../components/Dashboard/PendingReservations/PendingReservations';
import OpeningHours from '../../components/Dashboard/OpeningHours/OpeningHours';
import EmployeeManagement from '../../components/Dashboard/EmployeeManagement/EmployeeManagement';
import AllReservations from '../../components/Dashboard/AllReservations/AllReservations';
import FloorPlanDesigner from '../../components/Dashboard/FloorPlanDesigner/FloorPlanDesigner';
import LoadingIndicator from '../../components/Dashboard/Loading/LoadingIndicator';

// Custom hooks
import { useActiveTab } from './hooks/useActiveTab';
import { useReservationManagement } from './hooks/useReservationManagement';
import { useHoursManagement } from './hooks/useHoursManagement';
import { useEmployeeManagement } from './hooks/useEmployeeManagement';
import { useTablesManagement } from './hooks/useTablesManagement';
import { useWebSocket } from './hooks/useWebSocket';
import { useUIState } from './hooks/useUIState';

/**
 * RestaurantDashboard component
 *
 * Main dashboard for restaurant management
 */
const RestaurantDashboard = () => {
    const { tab } = useParams();
    const location = useLocation();

    // State for data
    const [allReservations, setAllReservations] = useState([]);
    const [openingHours, setOpeningHours] = useState([]);
    const [pendingReservations, setPendingReservations] = useState([]);
    const [tables, setTables] = useState([]);
    const [employees, setEmployees] = useState([]);

    // UI state management
    const {
        reservationFilterMode,
        sidebarCollapsed,
        loading,
        setLoading,
        toggleReservationFilterMode,
        handleSidebarToggle
    } = useUIState();

    // Tab management
    const [activeTab, setActiveTab] = useActiveTab(
        tab || 'pendingReservations',
        setAllReservations,
        setOpeningHours,
        setPendingReservations,
        setTables,
        setEmployees,
        setLoading
    );

    // Reservation management
    const {
        handleApproveReservation,
        approveAllReservations,
        handleRejectReservation
    } = useReservationManagement(
        pendingReservations,
        setPendingReservations,
        setAllReservations,
        setLoading
    );

    // Hours management
    const {
        editingHours,
        handleHoursChange,
        handleToggleDay,
        toggleHoursEditMode,
        saveHours
    } = useHoursManagement(
        openingHours,
        setOpeningHours,
        setLoading
    );

    // Tables management
    const {
        tablesEditMode,
        getTableName,
        toggleTablesEditMode
    } = useTablesManagement(tables);

    // Employee management
    const {
        addEmployee,
        handleRemoveEmployee,
        createNewEmployee,
        updateEmployeeRole,
        toggleAddEmployee,
        setAddEmployee
    } = useEmployeeManagement(employees, setEmployees);

    // WebSocket connection
    useWebSocket(
        'wss://rms.bushive.app',
        activeTab,
        pendingReservations,
        setPendingReservations
    );

    // Set default route on initial load if no tab is specified
    useEffect(() => {
        if (!tab && location.pathname === '/dashboard') {
            setActiveTab('pendingReservations');
        }
    }, [location, tab, setActiveTab]);

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
                                <FloorPlanDesigner editMode={tablesEditMode}/>
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
                                    setFiltersVisible={toggleReservationFilterMode}
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