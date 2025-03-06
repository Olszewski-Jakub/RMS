import React from 'react';
import './EmployeeManagement.css';

import EmployeeTable from './components/EmployeeTable';
import AddEmployeeModal from './components/AddEmployeeModal';
import ChangeRoleModal from './components/ChangeRoleModal';

import {useEmployeeForm} from './hooks/useEmployeeForm';
import {useRoleManagement} from './hooks/useRoleManagement';

/**
 * EmployeeManagement component
 *
 * Main component for managing employees - displays table and handles employee operations
 */
const EmployeeManagement = ({
                                employees,
                                handleRemoveEmployee,
                                createNewEmployee,
                                updateEmployeeRole,
                                showDialog,
                                setShowDialog
                            }) => {
    // Custom hooks for form handling and role management
    const {
        newEmployee,
        formErrors,
        handleEmployeeInputChange,
        handleAddEmployee,
        closeDialog
    } = useEmployeeForm(createNewEmployee, setShowDialog);

    const {
        showRoleModal,
        selectedEmployee,
        selectedRole,
        openRoleModal,
        handleRoleChange,
        saveRoleChange,
        closeRoleModal
    } = useRoleManagement(updateEmployeeRole);

    return (
        <div className="employee-dashboard">
            {/* Employee Table */}
            <EmployeeTable
                employees={employees}
                onChangeRole={openRoleModal}
                onDeleteUser={handleRemoveEmployee}
            />

            {/* Add Employee Modal */}
            {showDialog && (
                <AddEmployeeModal
                    newEmployee={newEmployee}
                    formErrors={formErrors}
                    onInputChange={handleEmployeeInputChange}
                    onSubmit={handleAddEmployee}
                    onClose={closeDialog}
                />
            )}

            {/* Change Role Modal */}
            {showRoleModal && (
                <ChangeRoleModal
                    employee={selectedEmployee}
                    selectedRole={selectedRole}
                    onRoleChange={handleRoleChange}
                    onSave={saveRoleChange}
                    onClose={closeRoleModal}
                />
            )}
        </div>
    );
};

export default EmployeeManagement;