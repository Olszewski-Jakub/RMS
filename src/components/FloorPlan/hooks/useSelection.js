import { useState } from "react";

/**
 * Custom hook for managing element selection in the floor plan
 *
 * @param {Function} onTableSelect - Callback function for when a table is selected
 * @returns {Object} Selection state and handlers
 */
export const useSelection = (onTableSelect) => {
    const [selectedTable, setSelectedTable] = useState(null);
    const [selectedElement, setSelectedElement] = useState(null);

    // Handle table click and pass selection to parent component
    const handleTableOnClick = (tableId, totalSeats) => {
        setSelectedTable(tableId);
        setSelectedElement(`table-${tableId}`);

        // If parent component provided a callback for table selection
        if (onTableSelect) {
            onTableSelect(tableId, totalSeats);
        }
    };

    // Clear all selections
    const clearSelection = () => {
        setSelectedTable(null);
        setSelectedElement(null);
    };

    return {
        selectedTable,
        selectedElement,
        handleTableOnClick,
        clearSelection
    };
};