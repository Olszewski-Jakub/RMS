import React, {useState, useRef, useEffect} from 'react';
import {MoreVertical, Edit, Trash2, UserCog, Plus} from 'lucide-react';
import './EmployeeManagement.css';

// Action Menu Component
const ActionMenu = ({employee, onChangeRole, onDeleteUser}) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        // Add event listener when menu is open
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        // Cleanup the event listener
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const handleChangeRole = () => {
        onChangeRole(employee);
        setIsOpen(false);
    };

    const handleDeleteUser = () => {
        onDeleteUser(employee.uid);
        setIsOpen(false);
    };

    return (
        <div className="actions-wrapper">
            <button
                ref={buttonRef}
                className="action-button dots-button"
                onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(!isOpen);
                }}
            >
                <span className="dots-icon">⋮</span>
            </button>

            {isOpen && (
                <div
                    ref={menuRef}
                    className="action-menu"
                >
                    <ul className="action-list">
                        <li
                            className="action-item change-role"
                            onClick={handleChangeRole}
                        >
                            <UserCog className="action-icon"/>
                            Change Role
                        </li>
                        <li
                            className="action-item delete-user"
                            onClick={handleDeleteUser}
                        >
                            <Trash2 className="action-icon"/>
                            Delete User
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

// Main Employee Management Component
const EmployeeManagement = ({
                                employees,
                                handleRemoveEmployee,
                                createNewEmployee,
                                updateEmployeeRole,
                                showDialog,
                                setShowDialog
                            }) => {
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
        role: 'employee'
    });
    const [formErrors, setFormErrors] = useState({});
    const dialogRef = useRef(null);

    const handleEmployeeInputChange = (e) => {
        const {name, value} = e.target;
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
        <div className="employee-dashboard">
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
                                        onChangeRole={openRoleModal}
                                        onDeleteUser={handleRemoveEmployee}
                                    />
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>

            {/* Modal Dialog for New Employee */}
            {showDialog && (
                <div className="modal-backdrop">
                    <div className="modal-container" ref={dialogRef}>
                        <div className="modal-header">
                            <h3 className="modal-title">Add New Employee</h3>
                            <button className="modal-close" onClick={closeDialog}>×</button>
                        </div>
                        <div className="modal-content">
                            <form onSubmit={handleAddEmployee} className="employee-form">
                                <div className="form-grid">
                                    <div className="form-field">
                                        <label className="field-label">First Name</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            className={`field-input ${formErrors.firstName ? 'error' : ''}`}
                                            value={newEmployee.firstName}
                                            onChange={handleEmployeeInputChange}
                                        />
                                        {formErrors.firstName &&
                                            <div className="field-error">{formErrors.firstName}</div>}
                                    </div>

                                    <div className="form-field">
                                        <label className="field-label">Last Name</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            className={`field-input ${formErrors.lastName ? 'error' : ''}`}
                                            value={newEmployee.lastName}
                                            onChange={handleEmployeeInputChange}
                                        />
                                        {formErrors.lastName &&
                                            <div className="field-error">{formErrors.lastName}</div>}
                                    </div>

                                    <div className="form-field">
                                        <label className="field-label">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            className={`field-input ${formErrors.email ? 'error' : ''}`}
                                            value={newEmployee.email}
                                            onChange={handleEmployeeInputChange}
                                        />
                                        {formErrors.email && <div className="field-error">{formErrors.email}</div>}
                                    </div>

                                    <div className="form-field">
                                        <label className="field-label">Phone</label>
                                        <input
                                            type="tel"
                                            name="phoneNumber"
                                            placeholder="+1 2345678901"
                                            className={`field-input ${formErrors.phone ? 'error' : ''}`}
                                            value={newEmployee.phoneNumber || ''}
                                            onChange={handleEmployeeInputChange}
                                        />
                                        <small className="field-help">Include country code (e.g., +1 for US)</small>
                                        {formErrors.phone && <div className="field-error">{formErrors.phone}</div>}
                                    </div>

                                    <div className="form-field">
                                        <label className="field-label">Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            className={`field-input ${formErrors.password ? 'error' : ''}`}
                                            value={newEmployee.password}
                                            onChange={handleEmployeeInputChange}
                                        />
                                        {formErrors.password &&
                                            <div className="field-error">{formErrors.password}</div>}
                                    </div>

                                    <div className="form-field">
                                        <label className="field-label">Confirm Password</label>
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            className={`field-input ${formErrors.confirmPassword ? 'error' : ''}`}
                                            value={newEmployee.confirmPassword}
                                            onChange={handleEmployeeInputChange}
                                        />
                                        {formErrors.confirmPassword &&
                                            <div className="field-error">{formErrors.confirmPassword}</div>}
                                    </div>

                                    <div className="form-field">
                                        <label className="field-label">Role</label>
                                        <select
                                            name="role"
                                            className="field-select"
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
                                        className="cancel-action"
                                        onClick={closeDialog}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="submit-action"
                                    >
                                        Add Employee
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Role Change Modal */}
            {showRoleModal && (
                <div className="modal-backdrop">
                    <div className="modal-container role-modal">
                        <div className="modal-header">
                            <h3 className="modal-title">Change User Role</h3>
                            <button className="modal-close" onClick={() => setShowRoleModal(false)}>×</button>
                        </div>
                        <div className="modal-content">
                            <p className="employee-name">
                                Changing role
                                for <strong>{selectedEmployee?.firstName} {selectedEmployee?.lastName}</strong>
                            </p>

                            <div className="form-field">
                                <label className="field-label">Select Role</label>
                                <select
                                    className="field-select"
                                    value={selectedRole}
                                    onChange={handleRoleChange}
                                >
                                    <option value="employee">Employee</option>
                                    <option value="owner">Owner</option>
                                </select>
                            </div>

                            <div className="form-actions">
                                <button
                                    type="button"
                                    className="cancel-action"
                                    onClick={() => setShowRoleModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="submit-action"
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