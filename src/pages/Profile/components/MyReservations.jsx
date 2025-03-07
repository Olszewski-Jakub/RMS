import React, { useState } from "react";

const MyReservations = ({ handleManage, handleCancel }) => {
  // Current reservation state
  const [currentReservation, setCurrentReservation] = useState({
    id: "12345",
    date: "2025-02-20",
    startTime: "18:00",
    endTime: "20:00",
    people: 4,
  });

  // Reservation history
  const [reservationHistory, setReservationHistory] = useState([
    { id: "12344", date: "2025-02-10", startTime: "19:00", endTime: "21:00", people: 2 },
    { id: "12343", date: "2025-01-25", startTime: "20:00", endTime: "22:00", people: 6 },
  ]);

  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);

  // Handler for the manage button
  const onManageClick = (id) => {
    handleManage(id);
  };

  // Handler for the cancel button (shows confirmation first)
  const onCancelClick = () => {
    setShowCancelConfirmation(true);
  };

  // Handler for confirming cancellation
  const confirmCancellation = () => {
    // Add current reservation to history with a cancelled status
    setReservationHistory([
      {
        ...currentReservation,
        status: "Cancelled",
      },
      ...reservationHistory,
    ]);

    // Clear the current reservation
    setCurrentReservation(null);
    
    // Hide the confirmation modal
    setShowCancelConfirmation(false);
    
    // Call the parent handler
    handleCancel(currentReservation.id);
  };

  // Handler for canceling the confirmation
  const cancelCancellation = () => {
    setShowCancelConfirmation(false);
  };

  return (
    <div className="content">
      <div className="content-header">
        <h2>My Reservations</h2>
      </div>

      {currentReservation ? (
        <div className="card upcoming-reservation">
          <div className="card-header">
            <h3>Upcoming Reservation</h3>
          </div>
          <div className="card-body">
            <div className="reservation-grid">
              <div className="reservation-field">
                <span className="field-label">Reservation ID</span>
                <span className="field-value">{currentReservation.id}</span>
              </div>
              <div className="reservation-field">
                <span className="field-label">Date</span>
                <span className="field-value">{currentReservation.date}</span>
              </div>
              <div className="reservation-field">
                <span className="field-label">Time</span>
                <span className="field-value">
                  {currentReservation.startTime} - {currentReservation.endTime}
                </span>
              </div>
              <div className="reservation-field">
                <span className="field-label">People</span>
                <span className="field-value">{currentReservation.people} people</span>
              </div>
            </div>
            <div className="card-actions">
              <button
                className="btn-primary"
                onClick={() => onManageClick(currentReservation.id)}
              >
                Manage Reservation
              </button>
              <button className="btn-secondary" onClick={onCancelClick}>
                Cancel Reservation
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="card upcoming-reservation">
          <div className="card-header">
            <h3>No Upcoming Reservations</h3>
          </div>
          <div className="card-body">
            <p style={{ textAlign: 'center', color: '#666', fontSize: '15px' }}>
              You don't have any upcoming reservations.
            </p>
          </div>
        </div>
      )}

      {/* Cancellation Confirmation Modal */}
      {showCancelConfirmation && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Confirm Cancellation</h3>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to cancel your reservation for {currentReservation.date} at {currentReservation.startTime}?</p>
              <p>This action cannot be undone.</p>
            </div>
            <div className="modal-actions">
              <button className="btn-primary" onClick={cancelCancellation}>
                Keep My Reservation
              </button>
              <button className="btn-secondary" onClick={confirmCancellation}>
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="card history-card">
        <div className="card-header">
          <h3>Reservation History</h3>
        </div>
        <div className="card-body">
          {reservationHistory.length > 0 ? (
            <table className="history-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>People</th>
                  <th>Status</th>
                  <th>Manage Reservations</th>
                </tr>
              </thead>
              <tbody>
                {reservationHistory.map((res) => (
                  <tr key={res.id}>
                    <td>{res.id}</td>
                    <td>{res.date}</td>
                    <td>
                      {res.startTime} - {res.endTime}
                    </td>
                    <td>{res.people} people</td>
                    <td style={{ 
                      color: res.status === "Cancelled" ? "#e74c3c" : "#4CAF50",
                      fontWeight: "500"
                    }}>
                      {res.status || "Completed"}
                    </td>
                    <td>
                      <button
                        className="manage-btn-small"
                        onClick={() => onManageClick(res.id)}
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={{ textAlign: 'center', color: '#666', fontSize: '15px' }}>
              No reservation history found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyReservations;