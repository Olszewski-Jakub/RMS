import { useState } from 'react';
import authService from "../../../services/auth.service";
import userService from "../../../services/user.service";

/**
 * Custom hook for managing employees
 *
 * @param {Array} employees - Array of employees
 * @param {Function} setEmployees - Setter for employees
 * @returns {Object} Employee management state and functions
 */
export const useEmployeeManagement = (employees, setEmployees) => {
    const [addEmployee, setAddEmployee] = useState(false);

    // Handle removing an employee
    const handleRemoveEmployee = async (id) => {
        if (window.confirm('Are you sure you want to remove this employee?')) {
            try {
                await authService.deleteEmployee(id);
                setEmployees((prevEmployees) => prevEmployees.filter((emp) => emp.uid !== id));
            } catch (e) {
                console.log(e);
            }
        }
    };

    // Create a new employee
    const createNewEmployee = async (employee) => {
        try {
            if (employee.role === "owner") {
                await authService.createOwner(employee);
                setTimeout(async () => {
                    const users = await userService.getAllPrivilegedUsers();
                    setEmployees(users);
                }, 2000); // 2 seconds delay
            } else if (employee.role === "employee") {
                await authService.createEmployee(employee);
                setTimeout(async () => {
                    const users = await userService.getAllPrivilegedUsers();
                    setEmployees(users);
                }, 2000); // 2 seconds delay
            }
        } catch (e) {
            console.log(e);
        }
    };

    // Update an employee's role
    const updateEmployeeRole = async (id, role) => {
        try {
            await userService.changePrivilege(id, role);
            const users = await userService.getAllPrivilegedUsers();
            setEmployees(users);
        } catch (e) {
            console.log(e);
        }
    };

    // Toggle add employee dialog
    const toggleAddEmployee = () => {
        setAddEmployee(!addEmployee);
    };

    return {
        addEmployee,
        handleRemoveEmployee,
        createNewEmployee,
        updateEmployeeRole,
        toggleAddEmployee,
        setAddEmployee
    };
};