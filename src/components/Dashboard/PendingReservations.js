import React from 'react';

const PendingReservations = ({ pendingReservations, handleApproveReservation, handleRejectReservation, getTableName }) => {
  return (
    <div>
      {pendingReservations.length === 0 ? (
        <div className="bg-white p-6 rounded shadow text-center">
          <p className="text-gray-500 text-lg">No pending reservations.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {pendingReservations.map(reservation => (
            <div key={reservation.id} className="bg-white p-4 rounded shadow">
              <div className="flex justify-between">
                <div>
                  <div className="flex items-center mb-1">
                    <h3 className="font-semibold">{reservation.fullName} - {reservation.people} guests</h3>
                    <span className="ml-3 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                      {getTableName(reservation.tableId)}
                    </span>
                  </div>
                  <p className="text-gray-600">{reservation.date} at {reservation.startTime} - {reservation.endTime}</p>
                  <p className="text-gray-600">Contact: {reservation.phoneNumber}</p>

                </div>
                <div className="flex">
                  <button
                    className="px-3 py-1 bg-green-500 text-white rounded mr-2"
                    onClick={() => handleApproveReservation(reservation.id)}
                  >
                    Approve
                  </button>
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded"
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