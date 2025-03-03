import React, { useState, useEffect } from 'react';

const AllReservations = ({ allReservations, getTableName }) => {
  // State for filtered reservations
  const [filteredReservations, setFilteredReservations] = useState([]);

  // State for filter visibility
  const [filtersVisible, setFiltersVisible] = useState(false);

  // State for filter values
  const [filters, setFilters] = useState({
    name: '',
    date: '',
    startTime: '',
    endTime: '',
    table: '',
    status: ''
  });

  // Initialize filtered reservations with all reservations
  useEffect(() => {
    setFilteredReservations(allReservations);
  }, [allReservations]);

  // Filter function
  const applyFilters = () => {
    let results = [...allReservations];

    // Filter by name
    if (filters.name) {
      results = results.filter(res =>
        res.fullName.toLowerCase().includes(filters.name.toLowerCase())
      );
    }

    // Filter by date
    if (filters.date) {
      results = results.filter(res => res.date === filters.date);
    }

    // Filter by start time
    if (filters.startTime) {
      results = results.filter(res => res.startTime === filters.startTime);
    }

    // Filter by end time
    if (filters.endTime) {
      results = results.filter(res => res.endTime === filters.endTime);
    }

    // Filter by table
    if (filters.table) {
      results = results.filter(res =>
        getTableName(res.tableId).toLowerCase().includes(filters.table.toLowerCase())
      );
    }

    // Filter by status
    if (filters.status) {
      results = results.filter(res => res.status === filters.status);
    }

    setFilteredReservations(results);
  };

  // Update filters and apply them
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      name: '',
      date: '',
      startTime: '',
      endTime: '',
      table: '',
      status: ''
    });
    setFilteredReservations(allReservations);
  };

  // Toggle filters visibility
  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible);
  };

  // Apply filters when filters state changes
  useEffect(() => {
    applyFilters();
  }, [filters]);

  // Get unique status values for dropdown
  const statusOptions = [...new Set(allReservations.map(res => res.status))];

  return (
    <div className="flex h-full">
      {/* Main content area */}
      <div className="flex-1 space-y-4 p-4">
        {/* Header with filter toggle button */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Reservations</h2>
          <button
            onClick={toggleFilters}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center"
          >
            <span>Filters</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Table section */}
        <div className="bg-white rounded shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Start Time</th>
                <th className="px-4 py-2 text-left">End Time</th>
                <th className="px-4 py-2 text-left">Guests</th>
                <th className="px-4 py-2 text-left">Table</th>
                <th className="px-4 py-2 text-left">Contact</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredReservations.length > 0 ? (
                filteredReservations.map(reservation => (
                  <tr key={reservation.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2">{reservation.fullName}</td>
                    <td className="px-4 py-2">{reservation.date}</td>
                    <td className="px-4 py-2">{reservation.startTime}</td>
                    <td className="px-4 py-2">{reservation.endTime}</td>
                    <td className="px-4 py-2">{reservation.people}</td>
                    <td className="px-4 py-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                        {getTableName(reservation.tableId)}
                      </span>
                    </td>
                    <td className="px-4 py-2">{reservation.phoneNumber}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded ${
                        reservation.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        reservation.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        reservation.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-4 py-6 text-center text-gray-500">
                    No reservations found matching your filters
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Results count */}
        <div className="text-sm text-gray-600">
          Showing {filteredReservations.length} of {allReservations.length} reservations
        </div>
      </div>

      {filtersVisible ?
        <div className={`bg-gray-50 border-l border-gray-200 transition-all duration-300 ease-in-out ${filtersVisible ? 'w-72' : 'w-0 overflow-hidden'}`}>
          <div className="p-4 h-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium">Filters</h3>
              <button
                onClick={toggleFilters}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={filters.name}
                  onChange={handleFilterChange}
                  className="w-full p-2 border rounded"
                  placeholder="Filter by name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <input
                  type="date"
                  name="date"
                  value={filters.date}
                  onChange={handleFilterChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Start Time</label>
                <input
                  type="time"
                  name="startTime"
                  value={filters.startTime}
                  onChange={handleFilterChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">End Time</label>
                <input
                  type="time"
                  name="endTime"
                  value={filters.endTime}
                  onChange={handleFilterChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Table</label>
                <input
                  type="text"
                  name="table"
                  value={filters.table}
                  onChange={handleFilterChange}
                  className="w-full p-2 border rounded"
                  placeholder="Filter by table"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="">All Statuses</option>
                  {statusOptions.map(status => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={clearFilters}
                className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        </div> : null
      }
    </div>
  );
};

export default AllReservations;