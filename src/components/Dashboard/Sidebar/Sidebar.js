import React from 'react';
import cookieManager from "../../../utils/cookieManager";
import cookieKeys from "../../../constants/cookieKeys";

const Sidebar = ({activeTab, setActiveTab, pendingReservations}) => {
    return (
        <div className="w-64 bg-indigo-800 text-white">
            <div className="p-4 bg-indigo-900">
                <h1 className="text-xl font-bold">Restaurant Dashboard</h1>
            </div>
            <nav className="mt-6">
                <button
                    className={`sidebar-button ${activeTab === 'pendingReservations' ? 'active' : ''}`}
                    onClick={() => setActiveTab('pendingReservations')}
                >
                    <span className="mr-3">📋</span>
                    <span>Pending Reservations</span>
                    {pendingReservations.length > 0 && (
                        <span
                            className="ml-auto bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
              {pendingReservations.length}
            </span>
                    )}
                </button>
                {cookieManager.get(cookieKeys.USER) === 'owner' && (
                    <>
                        <button
                            className={`sidebar-button ${activeTab === 'hours' ? 'active' : ''}`}
                            onClick={() => setActiveTab('hours')}
                        >
                            <span className="mr-3">🕒</span>
                            <span>Opening Hours</span>
                        </button>

                        <button
                            className={`sidebar-button ${activeTab === 'tables' ? 'active' : ''}`}
                            onClick={() => setActiveTab('tables')}
                        >
                            <span className="mr-3">🪑</span>
                            <span>Tables Management</span>
                        </button>
                        <button
                            className={`sidebar-button ${activeTab === 'employees' ? 'active' : ''}`}
                            onClick={() => setActiveTab('employees')}
                        >
                            <span className="mr-3">👥</span>
                            <span>Employees</span>
                        </button>
                    </>

                )}


                <button
                    className={`sidebar-button ${activeTab === 'allReservations' ? 'active' : ''}`}
                    onClick={() => setActiveTab('allReservations')}
                >
                    <span className="mr-3">📅</span>
                    <span>All Reservations</span>
                </button>
            </nav>

            <div className="absolute bottom-0 w-64 bg-indigo-900 p-4">
                <div className="flex items-center">
                    <div className="w-8 h-8 bg-indigo-500 rounded-full mr-3"></div>
                    <div>
                        <p className="font-medium">Restaurant Manager</p>
                        <p className="text-indigo-300 text-sm">Admin</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;