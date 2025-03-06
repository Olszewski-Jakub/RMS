import React, { useState, useRef, useEffect } from 'react';
import { Trash2, UserCog } from 'lucide-react';

/**
 * ActionMenu component
 *
 * Displays a dropdown menu with actions for each employee row
 *
 * @param {Object} employee - The employee data
 * @param {Function} onChangeRole - Function to handle role change
 * @param {Function} onDeleteUser - Function to handle user deletion
 */
const ActionMenu = ({ employee, onChangeRole, onDeleteUser }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);

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

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

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

export default ActionMenu;