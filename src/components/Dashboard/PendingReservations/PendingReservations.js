import React from 'react';
import "./PendingReservations.css";
const PendingReservations = ({ pendingReservations, handleApproveReservation, handleRejectReservation }) => {
  return (
      <div className="reservation-container">
        {pendingReservations.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📋</div>
              <p className="empty-text">No pending reservations</p>
            </div>
        ) : (
            <div className="reservation-grid">
              {pendingReservations.map(reservation => (
                  <div key={reservation.id} className="reservation-card">
                    <div className="reservation-content">
                      <div className="reservation-info">
                        <div className="reservation-header">
                          <h3 className="guest-name">{reservation.fullName}</h3>
                          <span className="guest-count">{reservation.people} guests</span>
                        </div>

                        <div className="table-badge">
                          {reservation.tableId}
                        </div>

                        <div className="reservation-details">
                          <div className="detail-item">
                            <span className="detail-icon">🗓️</span>
                            <span className="detail-text">{reservation.date}</span>
                          </div>

                          <div className="detail-item">
                            <span className="detail-icon">⏰</span>
                            <span className="detail-text">{reservation.startTime} - {reservation.endTime}</span>
                          </div>

                          <div className="detail-item">
                            <span className="detail-icon">📱</span>
                            <span className="detail-text">{reservation.phoneNumber}</span>
                          </div>
                        </div>
                      </div>

                      <div className="action-buttons">
                        <button
                            className="approve-button"
                            onClick={() => handleApproveReservation(reservation.id)}
                        >
                          Approve
                        </button>
                        <button
                            className="reject-button"
                            onClick={() => handleRejectReservation(reservation.id)}
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
              ))}
            </div>
        )}
      </div>
  );
};

export default PendingReservations;