import React from 'react';

const Header = ({ activeTab, editingHours, toggleEditMode }) => {
  return (
    <header className="bg-white shadow h-16 flex items-center px-6">
      <h2 className="text-xl font-semibold">
        {activeTab === 'pendingReservations' && 'Reservations Requiring Approval'}
        {activeTab === 'hours' && 'Restaurant Opening Hours'}
        {activeTab === 'tables' && 'Tables Management'}
        {activeTab === 'employees' && 'Employee Management'}
        {activeTab === 'allReservations' && 'All Reservations'}
      </h2>

      {activeTab === 'hours' && (
        <div className="ml-auto flex items-center">
          <span className="mr-2">{editingHours ? 'Editing Mode' : 'View Mode'}</span>
          <div className="relative inline-block w-12 mr-2 align-middle">
            <input
              type="checkbox"
              id="toggle"
              className="sr-only"
              checked={editingHours}
              onChange={toggleEditMode}
            />
            <label
              htmlFor="toggle"
              className={`toggle-label ${editingHours ? 'active' : 'inactive'}`}
            >
              <span
                className={`toggle-handle ${editingHours ? 'active' : ''}`}
              ></span>
            </label>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;