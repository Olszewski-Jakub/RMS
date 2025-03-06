import React, {useState, useEffect} from "react";
import TableWithChairs from "./table/TableWithChairs";
import Wall from "./Wall";
import Door from "./Door";
import Window from "./Window";
import {tableTypes} from "../../constants/tableTypes";
import floorPlanService from "../../services/floorPlan.service";
import "./FloorPlan.css";
import Legend from "./Legend";

const FloorPlan = ({freeTables = [], onTableSelect}) => {
    const [selectedTable, setSelectedTable] = useState(null);
    const [selectedElement, setSelectedElement] = useState(null);
    const [tables, setTables] = useState(freeTables || []);
    const [walls, setWalls] = useState([]);
    const [doors, setDoors] = useState([]);
    const [windows, setWindows] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Canvas dimensions
    const [canvasWidth] = useState(800);
    const [canvasHeight] = useState(600);

    // Handles table click and passes the selection to parent component
    const handleTableOnClick = (tableId, totalSeats) => {
        setSelectedTable(tableId);
        setSelectedElement(`table-${tableId}`);

        // If parent component provided a callback for table selection
        if (onTableSelect) {
            onTableSelect(tableId, totalSeats);
        }
    };

    useEffect(() => {
        const freeTableIds = freeTables.map(table => table.id.toString());
        const updatedTables = tables.map(t => ({
            ...t,
            isActive: freeTableIds.includes(t.id)
        }));

        setTables(updatedTables);
    }, [freeTables]);

    useEffect(() => {
        const fetchFloorPlanData = async () => {
            setIsLoading(true);
            try {
                // Fetch tables
                const plan = await floorPlanService.get();

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

                // Fetch walls
                const wallsData = plan.walls || [];
                // Ensure walls have unique IDs
                const wallsWithIds = wallsData.map((wall, index) => ({
                    ...wall,
                    id: wall.id || `wall-${index}`
                }));
                setWalls(wallsWithIds);

                // Fetch doors
                const doorsData = plan.doors || [];
                // Ensure doors have unique IDs
                const doorsWithIds = doorsData.map((door, index) => ({
                    ...door,
                    id: door.id || `door-${index}`,
                    doorType: door.doorType || "hinged"
                }));
                setDoors(doorsWithIds);

                // Fetch windows
                const windowsData = plan.windows || [];
                // Ensure windows have unique IDs
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

    // Function to render walls using the new Wall component
    const renderWalls = () => {
        return walls.map((wall) => (
            <Wall
                key={wall.id}
                id={wall.id}
                x1={wall.x1}
                y1={wall.y1}
                x2={wall.x2}
                y2={wall.y2}
                thickness={wall.thickness || 8}
                color={wall.color || "#555"}
                isSelected={selectedElement === wall.id}
            />
        ));
    };

    // Function to render doors using the new Door component
    const renderDoors = () => {
        return doors.map((door) => (
            <Door
                key={door.id}
                id={door.id}
                x={door.x}
                y={door.y}
                width={door.width || 80}
                height={door.height || 30}
                wallThickness={door.wallThickness || 8}
                rotation={door.rotation || 0}
                isOpen={door.isOpen || false}
                openPercentage={door.openPercentage || 75}
                doorType={door.doorType || "hinged"}
                isSelected={selectedElement === door.id}
                color={door.color || "#855E42"}
            />
        ));
    };

    // Function to render windows using the new Window component
    const renderWindows = () => {
        return windows.map((window) => (
            <Window
                key={window.id}
                id={window.id}
                x={window.x}
                y={window.y}
                width={window.width || 60}
                height={window.height || 10}
                wallThickness={window.wallThickness || 8}
                rotation={window.rotation || 0}
                windowType={window.windowType || "fixed"}
                isOpen={window.isOpen || false}
                openPercentage={window.openPercentage || 50}
                isSelected={selectedElement === window.id}
            />
        ));
    };

    // Function to clear all selections
    const clearSelection = () => {
        setSelectedTable(null);
        setSelectedElement(null);
    };

    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="spinner-container">
                    <div className="spinner"></div>
                </div>
                <p className="loading-text">Loading floor plan...</p>
            </div>
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="floor-plan-container">
            <h2>Restaurant Floor Plan</h2>

            <svg
                width={canvasWidth}
                height={canvasHeight}
                viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}
                onClick={clearSelection}
            >
                {/* SVG Definitions for common patterns and filters */}
                <defs>
                    <pattern id="floor-pattern" patternUnits="userSpaceOnUse" width="60" height="60" patternTransform="rotate(45)">
                        <rect width="60" height="60" fill="#f5f5f5" />
                        <rect width="30" height="30" fill="#efefef" />
                        <rect x="30" y="30" width="30" height="30" fill="#efefef" />
                    </pattern>
                </defs>

                {/* Background with texture */}
                <rect x="0" y="0" width={canvasWidth} height={canvasHeight} fill="url(#floor-pattern)"/>

                {/* Render walls */}
                {renderWalls()}

                {/* Render windows */}
                {renderWindows()}

                {/* Render doors */}
                {renderDoors()}

                {/* Render tables with selection state */}
                {tables.map((table) => (
                    <TableWithChairs
                        key={table.id}
                        id={table.id}
                        x={table.x}
                        y={table.y}
                        tableType={table.type}
                        isAvailable={table.isActive}
                        onClick={handleTableOnClick}
                        rotation={table.rotation}
                        isSelected={selectedTable === table.id}
                    />
                ))}
            </svg>

            <Legend />
        </div>
    );
};

export default FloorPlan;