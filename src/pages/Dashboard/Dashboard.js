// RestaurantDashboard.js
import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Dashboard/Sidebar';
import Header from '../../components/Dashboard/Header';
import PendingReservations from '../../components/Dashboard/PendingReservations';
import OpeningHours from '../../components/Dashboard/OpeningHours';
import TablesManagement from '../../components/Dashboard/TablesManagement';
import EmployeeManagement from '../../components/Dashboard/EmployeeManagement';
import AllReservations from '../../components/Dashboard/AllReservations';
import './Dashboard.css';
import reservationService from '../../services/reservationService';
import openingHoursService from "../../services/openingHoursService";
// Custom hook for managing active tab state
const useActiveTab = (initialTab = 'pendingReservations', setAllReservations, setOpeningHours) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  // Side effect to listen for activeTab changes
 useEffect(() => {
    console.log(`Active tab changed to: ${activeTab}`); // Example: Log the active tab

    const fetchData = async () => {
      switch (activeTab) {
        case 'allReservations':
          try {
            const allReservationResponse = await reservationService.getAll();

            // Refactor the reservation data to include 'date' and format start and end times
            const refactoredReservations = allReservationResponse.map(reservation => {
                // Parse the start and end times
                const start = new Date(reservation.startTime);
                const end = new Date(reservation.endTime);

                // Format the new data
                return {
                    ...reservation,
                    date: start.toISOString().split('T')[0], // Date in YYYY-MM-DD format
                    startTime: start.toISOString().split('T')[1].split('.')[0], // Time in HH:mm:ss format
                    endTime: end.toISOString().split('T')[1].split('.')[0], // Time in HH:mm:ss format
                };
            });

            // Set the refactored reservations data
            setAllReservations(refactoredReservations);
          } catch (error) {
            console.error('Failed to fetch all reservations:', error);
          }
          break;
        case "hours":
          try {
            const openingHoursReposne = await openingHoursService.getAll()
            const hours = []
            for(const h of openingHoursReposne){
              h.isOpen = h.startTime != null && h.endTime != null
              hours.push(h)
            }
            setOpeningHours(hours)
          }catch (error) {
            console.error('Failed to fetch opeening hours:', error);
          }
          break;

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
  const [activeTab, setActiveTab] = useActiveTab('pendingReservations', setAllReservations, setOpeningHours);
  const [editingHours, setEditingHours] = useState(false);
  const [employees, setEmployees] = useState([
    { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@restaurant.com', phone: '555-123-4567', role: 'Waiter' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@restaurant.com', phone: '555-987-6543', role: 'Chef' },
    { id: 3, firstName: 'Mike', lastName: 'Johnson', email: 'mike.johnson@restaurant.com', phone: '555-456-7890', role: 'Host' },
  ]);
  const [tables, setTables] = useState([
    { id: 1, name: 'Table 1', capacity: 2, location: 'Window', isActive: true },
    { id: 2, name: 'Table 2', capacity: 2, location: 'Window', isActive: true },
    { id: 3, name: 'Table 3', capacity: 4, location: 'Center', isActive: true },
    { id: 4, name: 'Table 4', capacity: 4, location: 'Center', isActive: true },
    { id: 5, name: 'Table 5', capacity: 6, location: 'Corner', isActive: true },
    { id: 6, name: 'Table 6', capacity: 8, location: 'Patio', isActive: false },
    { id: 7, name: 'Table 7', capacity: 6, location: 'Patio', isActive: false },
    { id: 8, name: 'Table 8', capacity: 4, location: 'Bar', isActive: true },
  ]);
  const [pendingReservations, setPendingReservations] = useState([
    { id: 1, name: 'John Smith', date: '2025-03-04', time: '19:00', guests: 4, tableId: 3, contact: '555-123-4567', notes: 'Anniversary dinner' },
    { id: 2, name: 'Maria Garcia', date: '2025-03-05', time: '20:30', guests: 6, tableId: 5, contact: '555-987-6543', notes: 'Window seat preferred' },
    { id: 3, name: 'David Chen', date: '2025-03-03', time: '18:00', guests: 2, tableId: 1, contact: '555-456-7890', notes: 'Gluten-free options needed' },
  ]);

  const handleApproveReservation = (id) => {
    const reservation = pendingReservations.find((res) => res.id === id);
    const updatedPending = pendingReservations.filter((res) => res.id !== id);

    setPendingReservations(updatedPending);

    // Update in all reservations
    setAllReservations((prevReservations) =>
      prevReservations.map((res) =>
        res.id === id ? { ...res, status: 'Confirmed' } : res
      )
    );
  };

  const handleRejectReservation = (id) => {
    const updatedPending = pendingReservations.filter((res) => res.id !== id);
    setPendingReservations(updatedPending);

    // Update in all reservations
    setAllReservations((prevReservations) =>
      prevReservations.map((res) =>
        res.id === id ? { ...res, status: 'Rejected' } : res
      )
    );
  };

  const handleHoursChange = (dayId, field, value) => {
    setOpeningHours((prevHours) =>
        prevHours.map((day) =>
            day.dayId === dayId ? { ...day, [field]: value } : day
        )
    );
};

  const handleToggleDay = (dayId) => {
    setOpeningHours((prevHours) =>
      prevHours.map((hours) =>
        hours.dayId === dayId ? { ...hours, isOpen: !hours.isOpen } : hours
      )
    );
  };

  const handleToggleTableActive = (id) => {
    setTables((prevTables) =>
      prevTables.map((table) =>
        table.id === id ? { ...table, isActive: !table.isActive } : table
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
        if (hour.isOpen == false) {
          hour.startTime = null
          hour.endTime = null
        }
        await openingHoursService.update(hour.dayId, hour.startTime, hour.endTime, hour.day);
      }
    }catch (e) {
      console.log(e)
    }

  };

  const handleRemoveEmployee = (id) => {
    if (window.confirm('Are you sure you want to remove this employee?')) {
      setEmployees((prevEmployees) => prevEmployees.filter((emp) => emp.id !== id));
    }
  };

  const createNewEmployee = (employee) => {
    // Add logic to create a new employee
  };

  const getTableName = (tableId) => {
    const table = tables.find((t) => t.id === tableId);
    return table ? table.name : 'Unassigned';
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} pendingReservations={pendingReservations} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header activeTab={activeTab} editingHours={editingHours} toggleEditMode={toggleEditMode} />
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
            <TablesManagement
              tables={tables}
              handleToggleTableActive={handleToggleTableActive}
            />
          )}
          {activeTab === 'employees' && (
            <EmployeeManagement
              employees={employees}
              handleRemoveEmployee={handleRemoveEmployee}
              createNewEmployee={createNewEmployee}
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