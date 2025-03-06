import { useState } from 'react';

/**
 * Custom hook for managing employee form state and validation
 *
 * @returns {Object} Form state and handlers
 */
export const useEmployeeForm = (createNewEmployee, setShowDialog) => {
    const initialEmployee = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        role: 'employee'
    };

    const [newEmployee, setNewEmployee] = useState(initialEmployee);
    const [formErrors, setFormErrors] = useState({});

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
        setNewEmployee(initialEmployee);
        setShowDialog(false);
    };

    const closeDialog = () => {
        setShowDialog(false);
        setNewEmployee(initialEmployee);
        setFormErrors({});
    };

    return {
        newEmployee,
        formErrors,
        handleEmployeeInputChange,
        handleAddEmployee,
        closeDialog
    };
};