import React from 'react';

/**
 * ChangeRoleModal component
 *
 * Modal for changing an employee's role
 *
 * @param {Object} employee - The employee whose role is being changed
 * @param {String} selectedRole - Currently selected role
 * @param {Function} onRoleChange - Function to handle role selection change
 * @param {Function} onSave - Function to save the role change
 * @param {Function} onClose - Function to close the modal
 */
const ChangeRoleModal = ({
                             employee,
                             selectedRole,
                             onRoleChange,
                             onSave,
                             onClose
                         }) => {
    return (
        <div className="modal-backdrop">
            <div className="modal-container role-modal">
                <div className="modal-header">
                    <h3 className="modal-title">Change User Role</h3>
                    <button className="modal-close" onClick={onClose}>×</button>
                </div>
                <div className="modal-content">
                    <p className="employee-name">
                        Changing role
                        for <strong>{employee?.firstName} {employee?.lastName}</strong>
                    </p>

                    <div className="form-field">
                        <label className="field-label">Select Role</label>
                        <select
                            className="field-select"
                            value={selectedRole}
                            onChange={onRoleChange}
                        >
                            <option value="employee">Employee</option>
                            <option value="owner">Owner</option>
                        </select>
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
                            type="button"
                            className="submit-action"
                            onClick={onSave}
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangeRoleModal;