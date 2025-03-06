import React from 'react';
import './Header.css';

const Header = ({ activeTab, editingHours, toggleHoursEditMode, approveAllReservations, tablesEditMode, toggleTablesEditMode, toggleAddEmployee, toggleShowFilters}) => {
    // Function to get the appropriate icon based on active tab
    const getHeaderIcon = () => {
        switch(activeTab) {
            case 'pendingReservations':
                return (
                    <svg className="header-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                );
            case 'hours':
                return (
                    <svg className="header-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
            case 'tables':
                return (
                    <svg className="header-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
                    </svg>
                );
            case 'employees':
                return (
                    <svg className="header-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                );
            case 'allReservations':
                return (
                    <svg className="header-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                );
            default:
                return null;
        }
    };

    // Get title based on active tab
    const getHeaderTitle = () => {
        switch(activeTab) {
            case 'pendingReservations':
                return 'Reservations Requiring Approval';
            case 'hours':
                return 'Restaurant Opening Hours';
            case 'tables':
                return 'Tables Management';
            case 'employees':
                return 'Employee Management';
            case 'allReservations':
                return 'All Reservations';
            default:
                return 'Dashboard';
        }
    };

    return (
        <header className="app-header">
            <div className="header-title-with-icon">
                {getHeaderIcon()}
                <h2 className="header-title">
                    {getHeaderTitle()}
                </h2>
            </div>

            {activeTab === 'hours' && (
                <div className="header-controls">
                    <span className="mode-label">{editingHours ? 'Editing Mode' : 'View Mode'}</span>
                    <label className="toggle-container">
                        <input
                            type="checkbox"
                            className="toggle-input"
                            checked={editingHours}
                            onChange={toggleHoursEditMode}
                        />
                        <span className="toggle-slider"></span>
                    </label>
                </div>
            )}

            {activeTab === 'pendingReservations' && (
                <div className="header-controls">
                    <button className="header-button primary-button" onClick={approveAllReservations}>
                        <svg className="header-button-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Approve All
                    </button>
                </div>
            )}

            {activeTab === 'tables' && (
                <div className="header-controls">
                    <span className="mode-label">{tablesEditMode ? 'Editing Mode' : 'View Mode'}</span>
                    <label className="toggle-container">
                        <input
                            type="checkbox"
                            className="toggle-input"
                            checked={tablesEditMode}
                            onChange={toggleTablesEditMode}
                        />
                        <span className="toggle-slider"></span>
                    </label>
                </div>
            )}

            {activeTab === 'employees' && (
                <div className="header-controls">
                    <button className="header-button primary-button" onClick={toggleAddEmployee}>
                        <svg className="header-button-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add Employee
                    </button>
                </div>
            )}

            {activeTab === 'allReservations' && (
                <div className="header-controls">
                    <button className="header-button secondary-button" onClick={toggleShowFilters}>
                        <svg className="header-button-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                        Filter
                    </button>
                    <button className="header-button primary-button">
                        <svg className="header-button-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        New Reservation
                    </button>
                </div>
            )}
        </header>
    );
};

export default Header;