import React from 'react';
import ActionMenu from './ActionMenu';

/**
 * EmployeeTable component
 *
 * Displays the table of employees with their information
 *
 * @param {Array} employees - List of employee objects
 * @param {Function} onChangeRole - Function to handle role change
 * @param {Function} onDeleteUser - Function to handle user deletion
 */
const EmployeeTable = ({ employees, onChangeRole, onDeleteUser }) => {
    return (
        <div className="employee-table-container">
            <table className="employee-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Role</th>
                    <th><span className="sr-only">Actions</span></th>
                </tr>
                </thead>
                <tbody>
                {employees.length === 0 ? (
                    <tr>
                        <td colSpan="6" className="empty-state">
                            <div className="empty-content">
                                <div className="empty-icon">👥</div>
                                <p>No employees found</p>
                            </div>
                        </td>
                    </tr>
                ) : (
                    employees.map(employee => (
                        <tr key={employee.uid}>
                            <td className="id-cell" data-label="ID">
                                {employee.uid}
                            </td>
                            <td className="name-cell" data-label="Name">
                                {employee.firstName} {employee.lastName}
                            </td>
                            <td className="email-cell" data-label="Email">
                                {employee.email}
                            </td>
                            <td className="phone-cell" data-label="Phone">
                                {employee.phoneNumber}
                            </td>
                            <td className="role-cell" data-label="Role">
                                <span className={`role-badge ${employee.privileges || employee.role}`}>
                                  {employee.privileges || employee.role}
                                </span>
                            </td>
                            <td className="actions-cell">
                                <ActionMenu
                                    employee={employee}
                                    onChangeRole={onChangeRole}
                                    onDeleteUser={onDeleteUser}
                                />
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeTable;