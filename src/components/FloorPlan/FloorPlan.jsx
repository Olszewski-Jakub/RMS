import React from "react";
import "./FloorPlan.css";

// Components
import FloorCanvas from "./components/FloorCanvas";
import Legend from "./components/Legend";
import LoadingState from "./components/LoadingState";
import ErrorState from "./components/ErrorState";

// Custom hooks
import { useFloorPlanData } from "./hooks/useFloorPlanData";
import { useSelection } from "./hooks/useSelection";

/**
 * FloorPlan component
 *
 * Main component for displaying the restaurant floor plan
 *
 * @param {Array} freeTables - Array of currently available tables
 * @param {Function} onTableSelect - Callback function for when a table is selected
 */
const FloorPlan = ({ freeTables = [], onTableSelect }) => {
    // Canvas dimensions
    const canvasWidth = 800;
    const canvasHeight = 600;

    // Use custom hooks
    const {
        tables,
        walls,
        doors,
        windows,
        isLoading,
        error
    } = useFloorPlanData(freeTables);

    const {
        selectedTable,
        selectedElement,
        handleTableOnClick,
        clearSelection
    } = useSelection(onTableSelect);

    // Conditional rendering for loading and error states
    if (isLoading) {
        return <LoadingState />;
    }

    if (error) {
        return <ErrorState message={error} />;
    }

    return (
        <div className="floor-plan-container">
            <h2>Restaurant Floor Plan</h2>

            <FloorCanvas
                width={canvasWidth}
                height={canvasHeight}
                tables={tables}
                walls={walls}
                doors={doors}
                windows={windows}
                selectedTable={selectedTable}
                selectedElement={selectedElement}
                onTableClick={handleTableOnClick}
                onClearSelection={clearSelection}
            />

            <Legend />
        </div>
    );
};

export default FloorPlan;