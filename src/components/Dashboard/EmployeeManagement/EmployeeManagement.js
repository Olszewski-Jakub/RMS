import React, { useState, useRef, useEffect } from 'react';
import './EmployeeManagement.css';

const EmployeeManagement = ({ employees, handleRemoveEmployee, createNewEmployee, updateEmployeeRole }) => {
    const [showDialog, setShowDialog] = useState(false);
    const [showActionsMenu, setShowActionsMenu] = useState(null);
    const [showRoleModal, setShowRoleModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [selectedRole, setSelectedRole] = useState('employee');
    const [newEmployee, setNewEmployee] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        role: 'employee' // Default role
    });
    const [formErrors, setFormErrors] = useState({});
    const dialogRef = useRef(null);

    // Handle clicks outside of action menu to close it
    useEffect(() => {
        function handleClickOutside(event) {
            // Close dropdown menu when clicking outside
            if (showActionsMenu !== null &&
                !event.target.closest('.dots-button') &&
                !event.target.closest('.dropdown-menu')) {
                setShowActionsMenu(null);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showActionsMenu]);

    const handleAddEmployeeClick = () => {
        setShowDialog(true);
    };

    const handleEmployeeInputChange = (e) => {
        const { name, value } = e.target;
        setNewEmployee({
            ...newEmployee,
            [name]: value
        });
    };

    const validateEmployeeForm = () => {
        const errors = {};

        if (!newEmployee.firstName.trim()) errors.firstName = "First name is required";
        if (!newEmployee.lastName.trim()) errors.lastName = "Last name is required";

        if (!newEmployee.email.trim()) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(newEmployee.email)) {
            errors.email = "Email is invalid";
        }

        if (!newEmployee.password) {
            errors.password = "Password is required";
        } else if (newEmployee.password.length < 6) {
            errors.password = "Password must be at least 6 characters";
        }

        if (newEmployee.password !== newEmployee.confirmPassword) {
            errors.confirmPassword = "Passwords do not match";
        }

        if (!newEmployee.phoneNumber?.trim()) {
            errors.phone = "Phone number is required";
        } else if (!/^\+[1-9]\d{0,2}[ -]?\d{1,14}$/.test(newEmployee.phoneNumber)) {
            errors.phone = "Phone number must include a country code (e.g., +1 for US)";
        }

        return errors;
    };

    const handleAddEmployee = (e) => {
        e.preventDefault();

        const errors = validateEmployeeForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        // Clear any previous errors
        setFormErrors({});

        const employeeToAdd = {
            firstName: newEmployee.firstName,
            lastName: newEmployee.lastName,
            email: newEmployee.email,
            phoneNumber: newEmployee.phoneNumber,
            password: newEmployee.password,
            role: newEmployee.role
        };

        createNewEmployee(employeeToAdd);

        // Reset form and hide it
        setNewEmployee({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            phoneNumber: '',
            role: 'employee'
        });

        setShowDialog(false);
    };

    const openRoleModal = (employee) => {
        setSelectedEmployee(employee);
        setSelectedRole(employee.privileges || employee.role);
        setShowRoleModal(true);
        setShowActionsMenu(null);
    };

    const handleRoleChange = (e) => {
        setSelectedRole(e.target.value);
    };

    const saveRoleChange = () => {
        if (selectedEmployee && selectedRole) {
            updateEmployeeRole(selectedEmployee.uid, selectedRole);
            setShowRoleModal(false);
            setSelectedEmployee(null);
        }
    };

    const closeDialog = () => {
        setShowDialog(false);
        setNewEmployee({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            phoneNumber: '',
            role: 'employee'
        });
        setFormErrors({});
    };

    return (
        <div className="employee-management">
            {/* Employee List */}
            <div className="employee-table-container">
                <table className="employee-table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {employees.map(employee => (
                        <tr key={employee.uid}>
                            <td>{employee.uid}</td>
                            <td>{employee.firstName} {employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td>{employee.phoneNumber}</td>
                            <td>{employee.privileges || employee.role}</td>
                            <td className="actions-cell">
                                <div className="dropdown">
                                    <button
                                        className="dots-button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setShowActionsMenu(showActionsMenu === employee.uid ? null : employee.uid);
                                        }}
                                    >
                                        ⋮
                                    </button>

                                    {showActionsMenu === employee.uid && (
                                        <div className="dropdown-menu">
                                            <ul>
                                                <li onClick={() => openRoleModal(employee)}>
                                                    Change Role
                                                </li>
                                                <li className="delete-option" onClick={() => {
                                                    handleRemoveEmployee(employee.uid);
                                                    setShowActionsMenu(null);
                                                }}>
                                                    Delete User
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                    {employees.length === 0 && (
                        <tr>
                            <td colSpan="6" className="no-data">
                                No employees found
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            {/* Add Employee Button */}
            <div className="add-button-container">
                <button
                    className="add-button"
                    onClick={handleAddEmployeeClick}
                >
                    Add New Employee
                </button>
            </div>

            {/* Modal Dialog for New Employee */}
            {showDialog && (
                <div className="modal-overlay">
                    <div className="modal-dialog" ref={dialogRef}>
                        <div className="modal-header">
                            <h3>Add New User</h3>
                            <button className="close-button" onClick={closeDialog}>×</button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleAddEmployee}>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label>First Name</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={newEmployee.firstName}
                                            onChange={handleEmployeeInputChange}
                                        />
                                        {formErrors.firstName && <div className="error-message">{formErrors.firstName}</div>}
                                    </div>

                                    <div className="form-group">
                                        <label>Last Name</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={newEmployee.lastName}
                                            onChange={handleEmployeeInputChange}
                                        />
                                        {formErrors.lastName && <div className="error-message">{formErrors.lastName}</div>}
                                    </div>

                                    <div className="form-group">
                                        <label>Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={newEmployee.email}
                                            onChange={handleEmployeeInputChange}
                                        />
                                        {formErrors.email && <div className="error-message">{formErrors.email}</div>}
                                    </div>

                                    <div className="form-group">
                                        <label>Phone</label>
                                        <input
                                            type="tel"
                                            name="phoneNumber"
                                            placeholder="+1 2345678901"
                                            value={newEmployee.phoneNumber || ''}
                                            onChange={handleEmployeeInputChange}
                                        />
                                        <small className="help-text">Include country code (e.g., +1 for US)</small>
                                        {formErrors.phone && <div className="error-message">{formErrors.phone}</div>}
                                    </div>

                                    <div className="form-group">
                                        <label>Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            value={newEmployee.password}
                                            onChange={handleEmployeeInputChange}
                                        />
                                        {formErrors.password && <div className="error-message">{formErrors.password}</div>}
                                    </div>

                                    <div className="form-group">
                                        <label>Confirm Password</label>
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            value={newEmployee.confirmPassword}
                                            onChange={handleEmployeeInputChange}
                                        />
                                        {formErrors.confirmPassword && <div className="error-message">{formErrors.confirmPassword}</div>}
                                    </div>

                                    <div className="form-group">
                                        <label>Role</label>
                                        <select
                                            name="role"
                                            value={newEmployee.role}
                                            onChange={handleEmployeeInputChange}
                                        >
                                            <option value="employee">Employee</option>
                                            <option value="owner">Owner</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-actions">
                                    <button
                                        type="button"
                                        className="cancel-button"
                                        onClick={closeDialog}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="submit-button"
                                    >
                                        Add User
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Role Change Modal */}
            {showRoleModal && (
                <div className="modal-overlay">
                    <div className="modal-dialog role-modal">
                        <div className="modal-header">
                            <h3>Change User Role</h3>
                            <button className="close-button" onClick={() => setShowRoleModal(false)}>×</button>
                        </div>
                        <div className="modal-body">
                            <p>Change role for {selectedEmployee?.firstName} {selectedEmployee?.lastName}</p>

                            <div className="form-group">
                                <label>Select Role</label>
                                <select
                                    value={selectedRole}
                                    onChange={handleRoleChange}
                                    className="role-select"
                                >
                                    <option value="employee">Employee</option>
                                    <option value="owner">Owner</option>
                                </select>
                            </div>

                            <div className="form-actions">
                                <button
                                    type="button"
                                    className="cancel-button"
                                    onClick={() => setShowRoleModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="submit-button"
                                    onClick={saveRoleChange}
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmployeeManagement;