import React from 'react';
import './OpeningHours.css'
const OpeningHours = ({openingHours, editingHours, handleHoursChange, handleToggleDay, saveHours}) => {
  return (
      <div className="hours-container">
          <div className="hours-table-container">
          <table className="hours-table">
            <thead>
            <tr>
              <th>Day</th>
              <th>Status</th>
              <th>Opening Time</th>
              <th>Closing Time</th>
            </tr>
            </thead>
            <tbody>
            {Array.isArray(openingHours) && openingHours.map((hours) => (
                <tr key={hours.day}>
                  <td className="day-cell">
                    <span className="day-name">{hours.day}</span>
                  </td>
                  <td>
                    {editingHours ? (
                        <div className="status-toggle">
                          <label className="toggle-switch">
                            <input
                                type="checkbox"
                                checked={hours.isOpen}
                                onChange={() => handleToggleDay(hours.dayId)}
                            />
                            <span className="toggle-slider"></span>
                          </label>
                          <span className="toggle-label">{hours.isOpen ? 'Open' : 'Closed'}</span>
                        </div>
                    ) : (
                        <span className={`status-indicator ${hours.isOpen ? 'status-open' : 'status-closed'}`}>
                      {hours.isOpen ? 'Open' : 'Closed'}
                    </span>
                    )}
                  </td>
                  <td>
                    {editingHours ? (
                        <div className="time-input-wrapper">
                          <input
                              type="time"
                              className={`time-input ${!hours.isOpen ? 'disabled' : ''}`}
                              value={hours.startTime}
                              disabled={!hours.isOpen}
                              onChange={(e) => handleHoursChange(hours.dayId, 'startTime', e.target.value)}
                          />
                        </div>
                    ) : (
                        <span className="time-display">{hours.startTime}</span>
                    )}
                  </td>
                  <td>
                    {editingHours ? (
                        <div className="time-input-wrapper">
                          <input
                              type="time"
                              className={`time-input ${!hours.isOpen ? 'disabled' : ''}`}
                              value={hours.endTime}
                              disabled={!hours.isOpen}
                              onChange={(e) => handleHoursChange(hours.dayId, 'endTime', e.target.value)}
                          />
                        </div>
                    ) : (
                        <span className="time-display">{hours.endTime}</span>
                    )}
                  </td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>

        {editingHours && (
            <div className="save-button-container">
              <button className="save-button" onClick={saveHours}>
                <span className="save-icon">💾</span>
                <span>Save Hours</span>
              </button>
            </div>
        )}
      </div>
  );
};

export default OpeningHours;