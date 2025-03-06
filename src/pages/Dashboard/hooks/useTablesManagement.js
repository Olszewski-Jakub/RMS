import { useState } from 'react';

/**
 * Custom hook for managing tables
 *
 * @param {Array} tables - Array of tables
 * @returns {Object} Tables management state and functions
 */
export const useTablesManagement = (tables) => {
    const [tablesEditMode, setTablesEditMode] = useState(false);

    // Get table name by ID
    const getTableName = (tableId) => {
        const table = tables.find((t) => t.id === tableId);
        return table ? table.name : 'Unassigned';
    };

    // Toggle tables edit mode
    const toggleTablesEditMode = () => {
        setTablesEditMode(!tablesEditMode);
    };

    return {
        tablesEditMode,
        getTableName,
        toggleTablesEditMode
    };
};