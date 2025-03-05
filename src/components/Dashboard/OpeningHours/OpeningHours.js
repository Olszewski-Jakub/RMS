import React from 'react';

const OpeningHours = ({openingHours, editingHours, handleHoursChange, handleToggleDay, saveHours}) => {
  console.log(openingHours)
  return (
    <div className="bg-white p-4 rounded shadow">
      <table className="w-full">
        <thead>
        <tr className="border-b">
          <th className="text-left py-2">Day</th>
          <th className="text-left py-2">Status</th>
          <th className="text-left py-2">Opening Time</th>
          <th className="text-left py-2">Closing Time</th>
        </tr>
        </thead>
        <tbody>


        {Array.isArray(openingHours) &&
          openingHours.map((hours) => (
            <tr key={hours.day} className="border-b">
              <td className="py-2 capitalize">{hours.day}</td>
              <td className="py-2">
                {editingHours ? (
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={hours.isOpen}
                      onChange={() => handleToggleDay(hours.dayId)}
                    />
                    <span>{hours.isOpen ? 'Open' : 'Closed'}</span>
                  </div>
                ) : (
                  <span className={hours.isOpen ? 'text-green-600' : 'text-red-600'}>
                        {hours.isOpen ? 'Open' : 'Closed'}
                      </span>
                )}
              </td>
              <td className="py-2">
                {editingHours ? (
                  <input
                    type="time"
                    className="border p-1 rounded"
                    value={hours.startTime}
                    disabled={!hours.isOpen}
                    onChange={(e) => handleHoursChange(hours.dayId, 'startTime', e.target.value)}
                  />
                ) : (
                  <span>{hours.startTime}</span>
                )}
              </td>
              <td className="py-2">
                {editingHours ? (
                  <input
                    type="time"
                    className="border p-1 rounded"
                    value={hours.endTime}
                    disabled={!hours.isOpen}
                    onChange={(e) => handleHoursChange(hours.dayId, 'endTime', e.target.value)}
                  />
                ) : (
                  <span>{hours.endTime}</span>
                )}
              </td>
            </tr>
          ))}


        </tbody>
      </table>
      {editingHours && (
        <button
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded"
          onClick={saveHours}
        >
          Save Hours
        </button>
      )}
    </div>
  );
};

export default OpeningHours;