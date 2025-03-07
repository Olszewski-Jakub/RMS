import React from "react";
import TableWithChairs from "./TableWithChairs";
import Wall from "./Wall";
import Door from "./Door";
import Window from "./Window";

/**
 * FloorCanvas component renders the SVG canvas with all floor plan elements
 */
const FloorCanvas = ({
                         width,
                         height,
                         tables,
                         walls,
                         doors,
                         windows,
                         selectedTable,
                         selectedElement,
                         onTableClick,
                         onClearSelection
                     }) => {
    // Render walls
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

    // Render doors
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

    // Render windows
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

    // Render tables
    const renderTables = () => {
        return tables.map((table) => (
            <TableWithChairs
                key={table.id}
                id={table.id}
                x={table.x}
                y={table.y}
                tableType={table.type}
                isAvailable={table.isActive}
                label={table.tableNum}
                onClick={onTableClick}
                rotation={table.rotation}
                isSelected={selectedTable === table.id}
            />
        ));
    };

    return (
        <svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            onClick={onClearSelection}
        >
            {/* Floor pattern */}
            <defs>
                <pattern
                    id="floor-pattern"
                    patternUnits="userSpaceOnUse"
                    width="60"
                    height="60"
                    patternTransform="rotate(45)"
                >
                    <rect width="60" height="60" fill="#f5f5f5" />
                    <rect width="30" height="30" fill="#efefef" />
                    <rect x="30" y="30" width="30" height="30" fill="#efefef" />
                </pattern>
            </defs>

            {/* Background */}
            <rect x="0" y="0" width={width} height={height} fill="url(#floor-pattern)"/>

            {/* Floor plan elements */}
            {renderWalls()}
            {renderWindows()}
            {renderDoors()}
            {renderTables()}
        </svg>
    );
};

export default FloorCanvas;