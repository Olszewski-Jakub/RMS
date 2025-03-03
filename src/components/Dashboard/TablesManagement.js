import React from 'react';

const TablesManagement = ({ tables, handleToggleTableActive }) => {
  return (
    <div>
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left">Table ID</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Capacity</th>
              <th className="px-4 py-2 text-left">Location</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tables.map(table => (
              <tr key={table.id} className="border-t">
                <td className="px-4 py-2">{table.id}</td>
                <td className="px-4 py-2">{table.name}</td>
                <td className="px-4 py-2">{table.capacity} persons</td>
                <td className="px-4 py-2">{table.location}</td>
                <td className="px-4 py-2">
                  <span className={`status-badge ${table.isActive ? 'status-active' : 'status-inactive'}`}>
                    {table.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <button
                    className={`px-3 py-1 rounded text-white text-sm ${table.isActive ? 'bg-red-500' : 'bg-green-500'}`}
                    onClick={() => handleToggleTableActive(table.id)}
                  >
                    {table.isActive ? 'Deactivate' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-end">
        <button className="px-4 py-2 bg-indigo-600 text-white rounded">
          Add New Table
        </button>
      </div>
    </div>
  );
};

export default TablesManagement;