import React, { useState } from 'react';

const EmployeeManagement = ({ employees, handleRemoveEmployee, createNewEmployee }) => {
  const [showAddEmployeeForm, setShowAddEmployeeForm] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });
  const [formErrors, setFormErrors] = useState({});

  const handleAddEmployeeClick = () => {
    setShowAddEmployeeForm(true);
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

    if (!newEmployee.phone.trim()) {
      errors.phone = "Phone number is required";
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

    // Add new employee to the list
    const newEmployeeId = employees.length > 0 ? Math.max(...employees.map(emp => emp.id)) + 1 : 1;

    const employeeToAdd = {
      firstName: newEmployee.firstName,
      lastName: newEmployee.lastName,
      email: newEmployee.email,
      phone: newEmployee.phone,
      role: 'employee' // Default role
    };

    createNewEmployee(employeeToAdd)
    // Reset form and hide it
    setNewEmployee({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: ''
    });

    setShowAddEmployeeForm(false);
  };

  const cancelAddEmployee = () => {
    setShowAddEmployeeForm(false);
    setNewEmployee({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: ''
    });
    setFormErrors({});
  };

  return (
    <div>
      {/* Employee List */}
      <div className="bg-white rounded shadow overflow-x-auto mb-6">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(employee => (
              <tr key={employee.id} className="border-t">
                <td className="px-4 py-2">{employee.id}</td>
                <td className="px-4 py-2">{employee.firstName} {employee.lastName}</td>
                <td className="px-4 py-2">{employee.email}</td>
                <td className="px-4 py-2">{employee.phone}</td>
                <td className="px-4 py-2">{employee.role}</td>
                <td className="px-4 py-2">
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded"
                    onClick={() => handleRemoveEmployee(employee.id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
            {employees.length === 0 && (
              <tr>
                <td colSpan="6" className="px-4 py-4 text-center text-gray-500">
                  No employees found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Employee Button or Form */}
      {!showAddEmployeeForm ? (
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded"
            onClick={handleAddEmployeeClick}
          >
            Add New Employee
          </button>
        </div>
      ) : (
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-lg font-semibold mb-4">Add New Employee</h3>
          <form onSubmit={handleAddEmployee}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={newEmployee.firstName}
                  onChange={handleEmployeeInputChange}
                  className="w-full border rounded p-2"
                />
                {formErrors.firstName && <p className="text-red-600 text-sm mt-1">{formErrors.firstName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={newEmployee.lastName}
                  onChange={handleEmployeeInputChange}
                  className="w-full border rounded p-2"
                />
                {formErrors.lastName && <p className="text-red-600 text-sm mt-1">{formErrors.lastName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={newEmployee.email}
                  onChange={handleEmployeeInputChange}
                  className="w-full border rounded p-2"
                />
                {formErrors.email && <p className="text-red-600 text-sm mt-1">{formErrors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={newEmployee.phone}
                  onChange={handleEmployeeInputChange}
                  className="w-full border rounded p-2"
                />
                {formErrors.phone && <p className="text-red-600 text-sm mt-1">{formErrors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={newEmployee.password}
                  onChange={handleEmployeeInputChange}
                  className="w-full border rounded p-2"
                />
                {formErrors.password && <p className="text-red-600 text-sm mt-1">{formErrors.password}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={newEmployee.confirmPassword}
                  onChange={handleEmployeeInputChange}
                  className="w-full border rounded p-2"
                />
                {formErrors.confirmPassword && <p className="text-red-600 text-sm mt-1">{formErrors.confirmPassword}</p>}
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={cancelAddEmployee}
                className="px-4 py-2 border border-gray-300 rounded text-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded"
              >
                Add Employee
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default EmployeeManagement;