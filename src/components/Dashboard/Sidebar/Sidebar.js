import React, { useState, useEffect } from 'react';
import cookieManager from "../../../utils/cookieManager";
import cookieKeys from "../../../constants/cookieKeys";
import "./Sidebar.css";

const Sidebar = ({activeTab, setActiveTab, pendingReservations, onToggle}) => {
    const [collapsed, setCollapsed] = useState(false);

    // Check screen size on mount and when window resizes
    useEffect(() => {
        const checkScreenSize = () => {
            if (window.innerWidth <= 768) {
                setCollapsed(true);
            } else {
                setCollapsed(false);
            }
        };

        // Initial check
        checkScreenSize();

        // Add event listener
        window.addEventListener('resize', checkScreenSize);

        // Cleanup
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    // Notify parent component when sidebar state changes
    useEffect(() => {
        if (onToggle) {
            onToggle(collapsed);
        }
    }, [collapsed, onToggle]);

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    return (
        <>
            {/* Mobile toggle button (only visible on small screens) */}
            <button
                className="sidebar-toggle"
                onClick={toggleSidebar}
            >
                {collapsed ? '☰' : '✕'}
            </button>

            <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
                <div className="sidebar-header">
                    {
                        !collapsed && (
                            <h1 className="sidebar-title">
                                {collapsed ? '' : 'Dashboard'}
                            </h1>
                        )
                    }

                    <button
                        className="sidebar-collapse-btn"
                        onClick={toggleSidebar}
                    >
                        {collapsed ? '→' : '←'}
                    </button>
                </div>
                <nav className="sidebar-nav">
                    <button
                        className={`nav-button ${activeTab === 'pendingReservations' ? 'active' : ''}`}
                        onClick={() => setActiveTab('pendingReservations')}
                        title="Pending Reservations"
                    >
                        <span className="nav-icon">📋</span>
                        {!collapsed && (
                            <span className="nav-text">Pending Reservations</span>
                        )}
                        {pendingReservations.length > 0 && (
                            <span className="notification-badge">
                                {pendingReservations.length}
                            </span>
                        )}
                    </button>

                    {cookieManager.get(cookieKeys.USER) === 'owner' && (
                        <>
                            <button
                                className={`nav-button ${activeTab === 'hours' ? 'active' : ''}`}
                                onClick={() => setActiveTab('hours')}
                                title="Opening Hours"
                            >
                                <span className="nav-icon">🕒</span>
                                {!collapsed && (
                                    <span className="nav-text">Opening Hours</span>
                                )}
                            </button>

                            <button
                                className={`nav-button ${activeTab === 'tables' ? 'active' : ''}`}
                                onClick={() => setActiveTab('tables')}
                                title="Tables Management"
                            >
                                <span className="nav-icon">🪑</span>
                                {!collapsed && (
                                    <span className="nav-text">Tables Management</span>
                                )}
                            </button>

                            <button
                                className={`nav-button ${activeTab === 'employees' ? 'active' : ''}`}
                                onClick={() => setActiveTab('employees')}
                                title="Employees"
                            >
                                <span className="nav-icon">👥</span>
                                {!collapsed && (
                                    <span className="nav-text">Employees</span>
                                )}
                            </button>
                        </>
                    )}

                    <button
                        className={`nav-button ${activeTab === 'allReservations' ? 'active' : ''}`}
                        onClick={() => setActiveTab('allReservations')}
                        title="All Reservations"
                    >
                        <span className="nav-icon">📅</span>
                        {!collapsed && (
                            <span className="nav-text">All Reservations</span>
                        )}
                    </button>
                </nav>

                <div className={`user-profile ${collapsed ? 'collapsed' : ''}`}>
                    <div className="profile-avatar"></div>
                    {!collapsed && (
                        <div className="profile-info">
                            <p className="profile-name">Restaurant Manager</p>
                            <p className="profile-role">Admin</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Overlay for mobile (closes sidebar when clicking outside) */}
            {!collapsed && window.innerWidth <= 768 && (
                <div className="sidebar-overlay" onClick={toggleSidebar}></div>
            )}
        </>
    );
};

export default Sidebar;