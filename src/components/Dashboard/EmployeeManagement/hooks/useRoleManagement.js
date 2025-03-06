import { useState } from 'react';

/**
 * Custom hook for managing employee role changes
 *
 * @param {Function} updateEmployeeRole - Function to update employee role in the backend
 * @returns {Object} Role management state and handlers
 */
export const useRoleManagement = (updateEmployeeRole) => {
    const [showRoleModal, setShowRoleModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [selectedRole, setSelectedRole] = useState('employee');

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

    const closeRoleModal = () => {
        setShowRoleModal(false);
        setSelectedEmployee(null);
    };

    return {
        showRoleModal,
        selectedEmployee,
        selectedRole,
        openRoleModal,
        handleRoleChange,
        saveRoleChange,
        closeRoleModal
    };
};