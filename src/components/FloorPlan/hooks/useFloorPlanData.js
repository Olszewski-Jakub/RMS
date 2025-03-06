import { useState, useEffect } from "react";
import { tableTypes } from "../../../constants/tableTypes";
import floorPlanService from "../../../services/floorPlan.service";

/**
 * Custom hook for fetching and managing floor plan data
 *
 * @param {Array} freeTables - Array of available tables passed from parent
 * @returns {Object} Floor plan data state and loading status
 */
export const useFloorPlanData = (freeTables = []) => {
    const [tables, setTables] = useState(freeTables || []);
    const [walls, setWalls] = useState([]);
    const [doors, setDoors] = useState([]);
    const [windows, setWindows] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Update available tables when freeTables prop changes
    useEffect(() => {
        const freeTableIds = freeTables.map(table => table.id.toString());
        const updatedTables = tables.map(t => ({
            ...t,
            isActive: freeTableIds.includes(t.id)
        }));

        setTables(updatedTables);
    }, [freeTables]);

    // Fetch floor plan data on component mount
    useEffect(() => {
        const fetchFloorPlanData = async () => {
            setIsLoading(true);
            try {
                // Fetch floor plan
                const plan = await floorPlanService.get();

                // Process tables
                const tablesData = plan.tables;
                const formattedTables = tablesData.map(table => ({
                    id: table.id.toString(),
                    x: table.x,
                    y: table.y,
                    rotation: table.rotation || 0,
                    type: Object.values(tableTypes).find(t => t.name === table.type) || tableTypes.medium1,
                    isActive: table.isActive !== undefined ? table.isActive : true,
                    seats: table.seats
                }));
                setTables(formattedTables);

                // Process walls
                const wallsData = plan.walls || [];
                const wallsWithIds = wallsData.map((wall, index) => ({
                    ...wall,
                    id: wall.id || `wall-${index}`
                }));
                setWalls(wallsWithIds);

                // Process doors
                const doorsData = plan.doors || [];
                const doorsWithIds = doorsData.map((door, index) => ({
                    ...door,
                    id: door.id || `door-${index}`,
                    doorType: door.doorType || "hinged"
                }));
                setDoors(doorsWithIds);

                // Process windows
                const windowsData = plan.windows || [];
                const windowsWithIds = windowsData.map((window, index) => ({
                    ...window,
                    id: window.id || `window-${index}`,
                    windowType: window.windowType || "fixed"
                }));
                setWindows(windowsWithIds);

                setIsLoading(false);
            } catch (error) {
                console.error("Error loading floor plan:", error);
                setError("Failed to load floor plan data");
                setIsLoading(false);
            }
        };

        fetchFloorPlanData();
    }, []);

    return {
        tables,
        walls,
        doors,
        windows,
        isLoading,
        error
    };
};