import React from 'react';

/**
 * Component to display reservations in a table format
 *
 * @param {Array} reservations - Array of reservation objects to display
 */
const ReservationsTable = ({ reservations }) => {
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
        <div className="table-container">
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
                {reservations.length > 0 ? (
                    reservations.map(reservation => (
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
                                <div className="empty-state-message">
                                    No reservations found matching your filters
                                </div>
                            </div>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default ReservationsTable;