import React from 'react';

/**
 * AddEmployeeModal component
 *
 * Modal form for adding a new employee
 *
 * @param {Object} newEmployee - The new employee data
 * @param {Object} formErrors - Form validation errors
 * @param {Function} onInputChange - Function to handle input changes
 * @param {Function} onSubmit - Function to handle form submission
 * @param {Function} onClose - Function to close the modal
 */
const AddEmployeeModal = ({
                              newEmployee,
                              formErrors,
                              onInputChange,
                              onSubmit,
                              onClose
                          }) => {
    return (
        <div className="modal-backdrop">
            <div className="modal-container">
                <div className="modal-header">
                    <h3 className="modal-title">Add New Employee</h3>
                    <button className="modal-close" onClick={onClose}>×</button>
                </div>
                <div className="modal-content">
                    <form onSubmit={onSubmit} className="employee-form">
                        <div className="form-grid">
                            <div className="form-field">
                                <label className="field-label">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    className={`field-input ${formErrors.firstName ? 'error' : ''}`}
                                    value={newEmployee.firstName}
                                    onChange={onInputChange}
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
                                    onChange={onInputChange}
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
                                    onChange={onInputChange}
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
                                    onChange={onInputChange}
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
                                    onChange={onInputChange}
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
                                    onChange={onInputChange}
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
                                    onChange={onInputChange}
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
                                onClick={onClose}
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
    );
};

export default AddEmployeeModal;