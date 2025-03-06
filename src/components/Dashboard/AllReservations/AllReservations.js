import React, {useState, useEffect} from 'react';
import './AllReservations.css';

const AllReservations = ({allReservations, filtersVisible, setFiltersVisible}) => {
    // State for filtered reservations
    const [filteredReservations, setFilteredReservations] = useState([]);

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
                res.tableId
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
        const {name, value} = e.target;
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

    // Function to get status style class
    const getStatusClass = (status) => {
        switch (status) {
            case 'confirmed':
                return 'status-confirmed';
            case 'pending':
                return 'status-pending';
            case 'completed':
                return 'status-completed';
            default:
                return 'status-cancelled';
        }
    };

    return (
        <div className="app-container">
            {/* Main content area */}
            <div className="main-content-ar">          {/* Results count */}
                <div className="results-count">
                    Showing {filteredReservations.length} of {allReservations.length} reservations
                </div>

                {/* Table container */}
                <div className="table-container">
                    <div className="">
                        <table className="reservations-table">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Guests</th>
                                <th>Table</th>
                                <th>Contact</th>
                                <th>Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredReservations.length > 0 ? (
                                filteredReservations.map(reservation => (
                                    <tr key={reservation.id}>
                                        <td className="guest-name" data-label="Name">{reservation.fullName}</td>
                                        <td data-label="Date">{reservation.date}</td>
                                        <td data-label="Time">{reservation.startTime} - {reservation.endTime}</td>
                                        <td data-label="Guests">
                                            <div className="guest-count">
                                                <svg className="icon-people" viewBox="0 0 24 24">
                                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                                    <circle cx="9" cy="7" r="4"></circle>
                                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                                </svg>
                                                {reservation.people}
                                            </div>
                                        </td>
                                        <td data-label="Table">
                            <span className="table-badge">
                              {reservation.tableId}
                            </span>
                                        </td>
                                        <td data-label="Contact">{reservation.phoneNumber}</td>
                                        <td data-label="Status">
                            <span className={`status-badge ${getStatusClass(reservation.status)}`}>
                              {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7">
                                        <div className="empty-state">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                            </svg>
                                            <div className="empty-state-message">No reservations found matching your
                                                filters
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Filter sidebar */}
            <div className={`filter-sidebar ${filtersVisible ? 'visible' : ''}`}>
                <div className="filter-content">
                    <div className="filter-header">
                        <h3 className="filter-title">Filters</h3>
                        <button
                            onClick={toggleFilters}
                            className="filter-close"
                            aria-label="Close filters"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>

                    <div className="filter-group">
                        <label className="filter-label" htmlFor="filter-name">Name</label>
                        <input
                            id="filter-name"
                            type="text"
                            name="name"
                            value={filters.name}
                            onChange={handleFilterChange}
                            className="filter-input"
                            placeholder="Filter by name"
                        />
                    </div>

                    <div className="filter-group">
                        <label className="filter-label" htmlFor="filter-date">Date</label>
                        <input
                            id="filter-date"
                            type="date"
                            name="date"
                            value={filters.date}
                            onChange={handleFilterChange}
                            className="filter-input"
                        />
                    </div>

                    <div className="filter-group">
                        <label className="filter-label" htmlFor="filter-start-time">Start Time</label>
                        <input
                            id="filter-start-time"
                            type="time"
                            name="startTime"
                            value={filters.startTime}
                            onChange={handleFilterChange}
                            className="filter-input"
                        />
                    </div>

                    <div className="filter-group">
                        <label className="filter-label" htmlFor="filter-end-time">End Time</label>
                        <input
                            id="filter-end-time"
                            type="time"
                            name="endTime"
                            value={filters.endTime}
                            onChange={handleFilterChange}
                            className="filter-input"
                        />
                    </div>

                    <div className="filter-group">
                        <label className="filter-label" htmlFor="filter-table">Table</label>
                        <input
                            id="filter-table"
                            type="text"
                            name="table"
                            value={filters.table}
                            onChange={handleFilterChange}
                            className="filter-input"
                            placeholder="Filter by table"
                        />
                    </div>

                    <div className="filter-group">
                        <label className="filter-label" htmlFor="filter-status">Status</label>
                        <select
                            id="filter-status"
                            name="status"
                            value={filters.status}
                            onChange={handleFilterChange}
                            className="filter-select"
                        >
                            <option value="">All Statuses</option>
                            {statusOptions.map(status => (
                                <option key={status} value={status}>
                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        onClick={clearFilters}
                        className="clear-filters"
                    >
                        Clear All Filters
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AllReservations;