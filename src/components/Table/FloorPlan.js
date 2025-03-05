import React, {useState, useEffect} from "react";
import TableWithChairs from "./TableWithChairs";
import {tableTypes} from "./tableTypes";
import floorPlanService from "../../services/floorPlan.service";
import "./FloorPlan.css";
const FloorPlan = () => {
    const [selectedTable, setSelectedTable] = useState(null);
    const [tables, setTables] = useState([]);
    const [walls, setWalls] = useState([]);
    const [doors, setDoors] = useState([]);
    const [windows, setWindows] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Canvas dimensions
    const [canvasWidth, setCanvasWidth] = useState(800);
    const [canvasHeight, setCanvasHeight] = useState(600);

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
                    type: tableTypes[table.type] || tableTypes.medium1,
                    isActive: table.isActive !== undefined ? table.isActive : true,
                    seats: calculateTotalSeats(tableTypes[table.type] || tableTypes.medium1)
                }));
                setTables(formattedTables);

                // Fetch walls
                const wallsData = plan.walls;
                setWalls(wallsData);

                // Fetch doors
                const doorsData = plan.doors
                setDoors(doorsData);

                // Fetch windows
                const windowsData = plan.windows;
                setWindows(windowsData);

                setIsLoading(false);
            } catch (error) {
                console.error("Error loading floor plan:", error);
                setError("Failed to load floor plan data");
                setIsLoading(false);
            }
        };

        fetchFloorPlanData();
    }, []);

    const calculateTotalSeats = (tableType) => {
        if (!tableType) return 0;
        return tableType.chairsTop + tableType.chairsBottom + tableType.chairsLeft + tableType.chairsRight;
    };

    const handleTableClick = (id, totalSeats) => {
        setSelectedTable(id);
        console.log(`Selected table: ${id} with ${totalSeats} seats.`);
    };

    // Function to render walls
    const renderWalls = () => {
        return walls.map((wall, index) => (
            <line
                key={`wall-${index}`}
                x1={wall.x1}
                y1={wall.y1}
                x2={wall.x2}
                y2={wall.y2}
                stroke="#333"
                strokeWidth="3"
            />
        ));
    };

    // Function to render doors
    const renderDoors = () => {
        return doors.map((door, index) => {
            // Calculate center for rotation
            const centerX = door.x + door.width / 2;
            const centerY = door.y + door.height / 2;
            const rotation = door.rotation || 0;

            // Door swing arc path
            let pathD;
            if (rotation === 0) {
                pathD = `M ${door.x} ${door.y} A ${door.width} ${door.width} 0 0 1 ${door.x + door.width} ${door.y}`;
            } else if (rotation === 90) {
                pathD = `M ${door.x} ${door.y} A ${door.height} ${door.height} 0 0 1 ${door.x} ${door.y + door.height}`;
            } else if (rotation === 180) {
                pathD = `M ${door.x + door.width} ${door.y + door.height} A ${door.width} ${door.width} 0 0 1 ${door.x} ${door.y + door.height}`;
            } else if (rotation === 270) {
                pathD = `M ${door.x + door.width} ${door.y + door.height} A ${door.height} ${door.height} 0 0 1 ${door.x + door.width} ${door.y}`;
            }

            return (
                <g key={`door-${index}`}>
                    <rect
                        x={door.x}
                        y={door.y}
                        width={door.width}
                        height={door.height}
                        fill="none"
                        stroke="#555"
                        strokeWidth="2"
                        transform={`rotate(${rotation}, ${centerX}, ${centerY})`}
                    />
                    <path
                        d={pathD}
                        fill="none"
                        stroke="#555"
                        strokeDasharray="3,3"
                        transform={`rotate(${rotation}, ${centerX}, ${centerY})`}
                    />
                </g>
            );
        });
    };

    // Function to render windows
    const renderWindows = () => {
        return windows.map((window, index) => {
            const centerX = window.x + window.width / 2;
            const centerY = window.y + window.height / 2;
            const rotation = window.rotation || 0;

            return (
                <rect
                    key={`window-${index}`}
                    x={window.x}
                    y={window.y}
                    width={window.width}
                    height={window.height}
                    fill="#cce6ff"
                    stroke="#5599ff"
                    transform={`rotate(${rotation}, ${centerX}, ${centerY})`}
                />
            );
        });
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

            <svg width={canvasWidth} height={canvasHeight} viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}>
                {/* Background */}
                <rect x="0" y="0" width={canvasWidth} height={canvasHeight} fill="#f9f9f9"/>

                {/* Render walls */}
                {renderWalls()}

                {/* Render windows */}
                {renderWindows()}

                {/* Render doors */}
                {renderDoors()}

                {/* Render tables */}
                {tables.map((table) => (
                    <TableWithChairs
                        key={table.id}
                        id={table.id}
                        x={table.x}
                        y={table.y}
                        tableType={table.type}
                        isAvaible={table.isActive}
                        onClick={handleTableClick}
                        rotation={table.rotation}
                    />
                ))}
            </svg>

            {/* Table details panel */}
            {selectedTable && (
                <div className="table-details-panel">
                    <h3>Table #{selectedTable}</h3>
                    {tables.find(t => t.id === selectedTable) && (
                        <>
                            <p>Total Seats: {tables.find(t => t.id === selectedTable).seats}</p>
                            <p>Status: {tables.find(t => t.id === selectedTable).isActive ? 'Available' : 'Unavailable'}</p>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default FloorPlan;