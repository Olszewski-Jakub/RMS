import React, {useState, useRef, useEffect} from 'react';
import {v4 as uuidv4} from 'uuid';

// Existing components
import Chair from '../../Table/Chair';
import {tableTypes} from '../../Table/tableTypes';

import tableService from "../../../services/table.service";
import wallsService from "../../../services/walls.service";
import doorService from "../../../services/door.service";
import windowService from "../../../services/window.service";

import './FloorPlanDesigner.css';

const sampleFloorPlan = {
    tables: [],
    walls: [],
    doors: [],
    windows: []
};

// Enum for drawing modes
const DrawingMode = {
    SELECT: 'select',
    TABLE: 'table',
    WALL: 'wall',
    DOOR: 'door',
    WINDOW: 'window',
    RESIZE: 'resize'
};

const FloorPlanDesigner = () => {
    // State management
    const [editMode, setEditMode] = useState(false);
    const [tables, setTables] = useState([]);
    const [walls, setWalls] = useState(sampleFloorPlan.walls || []);
    const [doors, setDoors] = useState(sampleFloorPlan.doors || []);
    const [windows, setWindows] = useState(sampleFloorPlan.windows || []);
    const [currentDrawingMode, setCurrentDrawingMode] = useState(DrawingMode.SELECT);
    const [selectedTableType, setSelectedTableType] = useState(tableTypes.medium1);
    const [isDragging, setIsDragging] = useState(false);
    const [draggedItem, setDraggedItem] = useState(null);
    const [selectedElement, setSelectedElement] = useState(null);
    const [elementDetailsPosition, setElementDetailsPosition] = useState(null);
    const [startPoint, setStartPoint] = useState(null);
    const [isResizing, setIsResizing] = useState(false);
    const [resizeElement, setResizeElement] = useState(null);
    const [resizeStartPoint, setResizeStartPoint] = useState(null);

    // Canvas resize states
    const [canvasWidth, setCanvasWidth] = useState(800);
    const [canvasHeight, setCanvasHeight] = useState(600);
    const [showResizeControls, setShowResizeControls] = useState(false);

    // SVG reference and dimensions
    const svgRef = useRef(null);
    const [svgDimensions, setSvgDimensions] = useState({width: canvasWidth, height: canvasHeight});

    // Get cursor position relative to SVG
    const getCursorPosition = (event) => {
        const svg = svgRef.current;
        const point = svg.createSVGPoint();
        point.x = event.clientX;
        point.y = event.clientY;
        return point.matrixTransform(svg.getScreenCTM().inverse());
    };

    useEffect(() => {
        const fetchTables = async () => {
            try {
                const data = await tableService.getAll();
                console.log(data);

                const tables = data.map(table => ({
                    ...table,
                    type: tableTypes[table.type] || null,
                    intId: table.id,
                    id: uuidv4()
                }));

                setTables(tables || []);
            } catch (error) {
                console.error('Error fetching tables:', error);
            }
        };

        const fetchWalls = async () => {
            try {
                const data = await wallsService.getAll();
                console.log(data);

                const walls = data.map(wall => ({
                    ...wall,
                    intId: wall.id,
                    id: uuidv4()
                }));

                setWalls(walls);
            } catch (error) {
                console.error('Error fetching walls:', error);
            }
        }

        const fetchDoors = async () => {
            try {
                const data = await doorService.getAll();
                console.log(data);

                const doors = data.map(door => ({
                    ...door,
                    intId: door.id,
                    id: uuidv4()
                }));

                setDoors(doors);
            } catch (error) {
                console.error('Error fetching doors:', error);
            }
        }

        const fetchWindows = async () => {
            try {
                const data = await windowService.getAll();
                console.log(data);

                const windows = data.map(window => ({
                    ...window,
                    intId: window.id,
                    id: uuidv4()
                }));

                setWindows(windows);
            } catch (error) {
                console.error('Error fetching windows:', error);
            }
        }

        fetchTables();
        fetchWalls();
        fetchDoors();
        fetchWindows();

    }, []);

    const addTable = async (event) => {
        if (currentDrawingMode !== DrawingMode.TABLE) return;

        const {x, y} = getCursorPosition(event);

        try {
            const seats = selectedTableType.chairsTop + selectedTableType.chairsBottom + selectedTableType.chairsLeft + selectedTableType.chairsRight;
            console.log("seats: " + seats)
            const tableId = await tableService.create(
                seats,
                false,
                x - selectedTableType.width / 2,
                y - selectedTableType.height / 2,
                0,
                selectedTableType.name
            )

            const newTable = {
                id: uuidv4(),
                intId: tableId.id,
                x: x - selectedTableType.width / 2,
                y: y - selectedTableType.height / 2,
                type: selectedTableType,
                isActive:true,
                rotation: 0
            };
            setTables([...tables, newTable]);
        } catch (e) {
            console.log(e)
        }
    };

    const dragElement = (event) => {
        if (isResizing && resizeElement) {
            handleResize(event);
            return;
        }

        if (!isDragging || !draggedItem) return;

        const {x, y} = getCursorPosition(event);

        switch (draggedItem.type) {
            case 'table':
                const updatedTables = tables.map(table =>
                    table.id === draggedItem.id
                        ? {...table, x: x - draggedItem.offsetX, y: y - draggedItem.offsetY}
                        : table
                );
                setTables(updatedTables);
                break;
            case 'wall':
                const updatedWalls = walls.map(wall => {
                    if (wall.id === draggedItem.id) {
                        const newX1 = x - draggedItem.offsetX;
                        const newY1 = y - draggedItem.offsetY;

                        const dx = wall.x2 - wall.x1;
                        const dy = wall.y2 - wall.y1;

                        return {
                            ...wall,
                            x1: newX1,
                            y1: newY1,
                            x2: newX1 + dx,
                            y2: newY1 + dy
                        };
                    }
                    return wall;
                });
                setWalls(updatedWalls);
                break;
            case 'door':
                const updatedDoors = doors.map(door =>
                    door.id === draggedItem.id
                        ? {...door, x: x - draggedItem.offsetX, y: y - draggedItem.offsetY}
                        : door
                );
                setDoors(updatedDoors);
                break;
            case 'window':
                const updatedWindows = windows.map(window =>
                    window.id === draggedItem.id
                        ? {...window, x: x - draggedItem.offsetX, y: y - draggedItem.offsetY}
                        : window
                );
                setWindows(updatedWindows);
                break;
            default:
                break;
        }
    };

    const startDragElement = (element, event, type) => {
        if (currentDrawingMode !== DrawingMode.SELECT) return;

        event.stopPropagation();
        setIsDragging(true);

        const {x, y} = getCursorPosition(event);

        const offsetX = type === 'wall' ? x - element.x1 : x - element.x;
        const offsetY = type === 'wall' ? y - element.y1 : y - element.y;

        setDraggedItem({
            ...element,
            type,
            offsetX,
            offsetY
        });
    };

    const stopDragging = async () => {
        if (isResizing && resizeElement) {
            switch (resizeElement.type) {
                case 'wall':
                    const updatedWall = walls.find(wall => wall.id === resizeElement.id);
                    if (updatedWall) {
                        wallsService.update(
                            updatedWall.intId,
                            updatedWall.x1,
                            updatedWall.y1,
                            updatedWall.x2,
                            updatedWall.y2
                        ).then(r => console.log("update wall: " + r.intId));
                    }
                    break;
                case 'door':
                    const updatedDoor = doors.find(door => door.id === resizeElement.id);
                    if (updatedDoor) {
                        doorService.update(
                            updatedDoor.intId,
                            updatedDoor.x,
                            updatedDoor.y,
                            updatedDoor.width,
                            updatedDoor.height,
                            updatedDoor.rotation
                        ).then(r => console.log("update door: " + r.intId));
                    }
                    break;
                case 'window':
                    const updatedWindow = windows.find(window => window.id === resizeElement.id);
                    if (updatedWindow) {
                        windowService.update(
                            updatedWindow.intId,
                            updatedWindow.x,
                            updatedWindow.y,
                            updatedWindow.width,
                            updatedWindow.height,
                            updatedWindow.rotation
                        ).then(r => console.log("update window: " + r.intId));
                    }
                    break;
                default:
                    break;
            }

            setIsResizing(false);
            setResizeElement(null);
            setResizeStartPoint(null);
            return;
        }

        if (!draggedItem || !draggedItem.type) {
            setIsDragging(false);
            setDraggedItem(null);
            return;
        }

        switch (draggedItem.type) {
            case 'table':
                const updatedTable = tables.find(table => table.id === draggedItem.id);
                if (updatedTable) {
                    const seats = updatedTable.type.chairsTop + updatedTable.type.chairsBottom +
                        updatedTable.type.chairsLeft + updatedTable.type.chairsRight;
                    tableService.update(
                        updatedTable.intId,
                        seats,
                        false,
                        updatedTable.x,
                        updatedTable.y,
                        updatedTable.rotation,
                        updatedTable.type.name
                    ).then(r => console.log("update table: " + r.intId));
                }
                break;
            case 'wall':
                const updatedWall = walls.find(wall => wall.id === draggedItem.id);
                if (updatedWall) {
                    wallsService.update(
                        updatedWall.intId,
                        updatedWall.x1,
                        updatedWall.y1,
                        updatedWall.x2,
                        updatedWall.y2
                    ).then(r => console.log("update wall: " + r.intId));
                }
                break;
            case 'door':
                const updatedDoor = doors.find(door => door.id === draggedItem.id);
                if (updatedDoor) {
                    doorService.update(
                        updatedDoor.intId,
                        updatedDoor.x,
                        updatedDoor.y,
                        updatedDoor.width,
                        updatedDoor.height,
                        updatedDoor.rotation
                    ).then(r => console.log("update door: " + r.intId));
                }
                break;
            case 'window':
                const updatedWindow = windows.find(window => window.id === draggedItem.id);
                if (updatedWindow) {
                    windowService.update(
                        updatedWindow.intId,
                        updatedWindow.x,
                        updatedWindow.y,
                        updatedWindow.width,
                        updatedWindow.height,
                        updatedWindow.rotation
                    ).then(r => console.log("update window: " + r.intId));
                }
                break;
            default:
                break;
        }

        setIsDragging(false);
        setDraggedItem(null);
    };

    const startResize = (element, event, type) => {
        event.stopPropagation();
        setIsResizing(true);
        setResizeElement({...element, type});
        setResizeStartPoint(getCursorPosition(event));
    };

    // Handle resize
    const handleResize = (event) => {
        if (!isResizing || !resizeElement || !resizeStartPoint) return;

        const currentPoint = getCursorPosition(event);
        const dx = currentPoint.x - resizeStartPoint.x;
        const dy = currentPoint.y - resizeStartPoint.y;

        switch (resizeElement.type) {
            case 'table':
                break;
            case 'wall':
                const updatedWalls = walls.map(wall =>
                    wall.id === resizeElement.id
                        ? {...wall, x2: wall.x2 + dx, y2: wall.y2 + dy}
                        : wall
                );
                setWalls(updatedWalls);
                break;
            case 'door':
                const updatedDoors = doors.map(door =>
                    door.id === resizeElement.id
                        ? {...door, width: Math.max(30, door.width + dx), height: Math.max(10, door.height + dy)}
                        : door
                );
                setDoors(updatedDoors);
                break;
            case 'window':
                const updatedWindows = windows.map(window =>
                    window.id === resizeElement.id
                        ? {...window, width: Math.max(20, window.width + dx), height: Math.max(5, window.height + dy)}
                        : window
                );
                setWindows(updatedWindows);
                break;
        }

        setResizeStartPoint(currentPoint);
    };

    // Rotate element
    const rotateElement = (element) => {
        switch (element.type) {
            case 'table':
                const updatedTables = tables.map(table =>
                    table.id === element.id
                        ? {...table, rotation: (table.rotation + 90) % 360}
                        : table
                );
                setTables(updatedTables);
                break;
            case 'wall':
                // For walls, swap the end points to rotate by 90 degrees
                const wallCenterX = (element.x1 + element.x2) / 2;
                const wallCenterY = (element.y1 + element.y2) / 2;
                const wallDx = element.x2 - element.x1;
                const wallDy = element.y2 - element.y1;

                const updatedWalls = walls.map(wall =>
                    wall.id === element.id
                        ? {
                            ...wall,
                            x1: wallCenterX + wallDy / 2,
                            y1: wallCenterY - wallDx / 2,
                            x2: wallCenterX - wallDy / 2,
                            y2: wallCenterY + wallDx / 2
                        }
                        : wall
                );
                setWalls(updatedWalls);
                break;
            case 'door':
                // FIXED: Door rotation now properly swaps width and height
                const updatedDoors = doors.map(door => {
                    if (door.id === element.id) {
                        // Get door center for rotation
                        const centerX = door.x + door.width / 2;
                        const centerY = door.y + door.height / 2;

                        // Swap width and height for proper rotation
                        const newRotation = (door.rotation + 90) % 360;
                        const newWidth = door.height;
                        const newHeight = door.width;

                        // Adjust position to keep door centered after rotation
                        const newX = centerX - newWidth / 2;
                        const newY = centerY - newHeight / 2;

                        return {
                            ...door,
                            x: newX,
                            y: newY,
                            width: newWidth,
                            height: newHeight,
                            rotation: newRotation
                        };
                    }
                    return door;
                });
                setDoors(updatedDoors);
                break;
            case 'window':
                const updatedWindows = windows.map(window => {
                    if (window.id === element.id) {
                        // Get window center for rotation
                        const centerX = window.x + window.width / 2;
                        const centerY = window.y + window.height / 2;

                        // Swap width and height for proper rotation
                        const newRotation = (window.rotation + 90) % 360;
                        const newWidth = window.height;
                        const newHeight = window.width;

                        // Adjust position to keep window centered after rotation
                        const newX = centerX - newWidth / 2;
                        const newY = centerY - newHeight / 2;

                        return {
                            ...window,
                            x: newX,
                            y: newY,
                            width: newWidth,
                            height: newHeight,
                            rotation: newRotation
                        };
                    }
                    return window;
                });
                setWindows(updatedWindows);
                break;
        }
        setSelectedElement(null);
        setElementDetailsPosition(null);
    };

    // Delete element
    const deleteElement = (element) => {
        switch (element.type) {
            case 'table':
                tableService.delete(element.intId)
                setTables(tables.filter(table => table.id !== element.id));
                break;
            case 'wall':
                wallsService.delete(element.intId)
                setWalls(walls.filter(wall => wall.id !== element.id));
                break;
            case 'door':
                doorService.delete(element.intId)
                setDoors(doors.filter(door => door.id !== element.id));
                break;
            case 'window':
                windowService.delete(element.intId)
                setWindows(windows.filter(window => window.id !== element.id));
                break;
        }
        setSelectedElement(null);
        setElementDetailsPosition(null);
    };

    const activateTable = async (element) => {
        await tableService.activate(element.intId)
        setTables(tables.map(table => table.id === element.id ? {...table, isActive: true} : table));
    }

    const deactivateTable = async (element) => {
        await tableService.deactivate(element.intId)
        setTables(tables.map(table => table.id === element.id ? {...table, isActive: false} : table));
    }

    // Start drawing wall
    const startDrawWall = (event) => {
        if (currentDrawingMode !== DrawingMode.WALL) return;
        const {x, y} = getCursorPosition(event);
        setStartPoint({x, y});
    };

    // End drawing wall
    const endDrawWall = async (event) => {
        if (currentDrawingMode !== DrawingMode.WALL || !startPoint) return;
        const {x, y} = getCursorPosition(event);

        // Only create a wall if it has some length
        if (Math.hypot(x - startPoint.x, y - startPoint.y) > 5) {

            const newWall = {
                id: uuidv4(),
                intId: null,
                x1: startPoint.x,
                y1: startPoint.y,
                x2: x,
                y2: y
            };
            console.log(newWall);
            const wallId = await wallsService.create(newWall.x1, newWall.y1, newWall.x2, newWall.y2);
            newWall.intId = wallId.id;

            setWalls([...walls, newWall]);
        }
        setStartPoint(null);
    };

    // Add door
    const addDoor = async (event) => {
        if (currentDrawingMode !== DrawingMode.DOOR) return;

        const {x, y} = getCursorPosition(event);
        const newDoor = {
            id: uuidv4(),
            intId: 0,
            x,
            y,
            width: 50,
            height: 10,
            rotation: 0,
            swing: 0
        };

        const doorId = await doorService.create(newDoor.x, newDoor.y, newDoor.width, newDoor.height, newDoor.rotation);
        console.log(doorId);
        newDoor.intId = doorId.id;
        console.log(newDoor);
        setDoors([...doors, newDoor]);
    };

    // Add window
    const addWindow = async (event) => {
        if (currentDrawingMode !== DrawingMode.WINDOW) return;

        const {x, y} = getCursorPosition(event);
        const newWindow = {
            id: uuidv4(),
            intId: windows.length > 0 ? Math.max(...windows.map(w => w.intId || 0), 0) + 1 : 1,
            x,
            y,
            width: 60,
            height: 10,
            rotation: 0
        };

        const windowId = await windowService.create(newWindow.x, newWindow.y, newWindow.width, newWindow.height, newWindow.rotation);
        newWindow.intId = windowId.id;

        setWindows([...windows, newWindow]);
    };

    // Show element details
    const showElementDetails = (element, type, event) => {
        event.stopPropagation();
        if (currentDrawingMode !== DrawingMode.SELECT) return;

        setSelectedElement({...element, type});
        setElementDetailsPosition({
            x: event.clientX,
            y: event.clientY
        });
    };

    // Render table preview
    const renderTablePreview = () => {
        const table = {
            x: 10,
            y: 10,
            type: selectedTableType,
            rotation: 0
        };

        const previewWidth = 180;
        const previewHeight = 150;
        const scale = Math.min(
            (previewWidth - 20) / table.type.width,
            (previewHeight - 20) / table.type.height
        ) * 0.5;

        const centerX = previewWidth / 2;
        const centerY = previewHeight / 2;
        const tableX = centerX - (table.type.width * scale) / 2;
        const tableY = centerY - (table.type.height * scale) / 2;

        return (
            <div className="table-preview">
                <div>Preview: {Object.keys(tableTypes).find(key => tableTypes[key] === selectedTableType)}</div>
                <svg width={previewWidth} height={previewHeight} className="table-preview-svg">
                    <rect
                        x={tableX}
                        y={tableY}
                        width={table.type.width * scale}
                        height={table.type.height * scale}
                        fill="#8B4513"
                        stroke="black"
                    />

                    {Array.from({length: table.type.chairsTop}, (_, i) => (
                        <circle
                            key={`top-${i}`}
                            cx={tableX + (15 + i * 30) * scale}
                            cy={tableY - 15 * scale}
                            r={8 * scale}
                            fill="#999"
                            stroke="#666"
                        />
                    ))}

                    {Array.from({length: table.type.chairsBottom}, (_, i) => (
                        <circle
                            key={`bottom-${i}`}
                            cx={tableX + (15 + i * 30) * scale}
                            cy={tableY + table.type.height * scale + 15 * scale}
                            r={8 * scale}
                            fill="#999"
                            stroke="#666"
                        />
                    ))}

                    {Array.from({length: table.type.chairsLeft}, (_, i) => (
                        <circle
                            key={`left-${i}`}
                            cx={tableX - 15 * scale}
                            cy={tableY + (15 + i * 30) * scale}
                            r={8 * scale}
                            fill="#999"
                            stroke="#666"
                        />
                    ))}

                    {Array.from({length: table.type.chairsRight}, (_, i) => (
                        <circle
                            key={`right-${i}`}
                            cx={tableX + table.type.width * scale + 15 * scale}
                            cy={tableY + (15 + i * 30) * scale}
                            r={8 * scale}
                            fill="#999"
                            stroke="#666"
                        />
                    ))}
                </svg>
            </div>
        );
    };

    // Render chairs with rotation
    const renderChairs = (table) => {
        const chairPositions = {
            0: {
                top: Array.from({length: table.type.chairsTop}, (_, i) => ({
                    cx: table.x + 15 + i * 30,
                    cy: table.y - 20
                })),
                bottom: Array.from({length: table.type.chairsBottom}, (_, i) => ({
                    cx: table.x + 15 + i * 30,
                    cy: table.y + table.type.height + 20
                })),
                left: Array.from({length: table.type.chairsLeft}, (_, i) => ({
                    cx: table.x - 20,
                    cy: table.y + 15 + i * 30
                })),
                right: Array.from({length: table.type.chairsRight}, (_, i) => ({
                    cx: table.x + table.type.width + 20,
                    cy: table.y + 15 + i * 30
                }))
            },
            90: {
                top: Array.from({length: table.type.chairsRight}, (_, i) => ({
                    cx: table.x + table.type.height + 20,
                    cy: table.y + 15 + i * 30
                })),
                bottom: Array.from({length: table.type.chairsLeft}, (_, i) => ({
                    cx: table.x - 20,
                    cy: table.y + 15 + i * 30
                })),
                left: Array.from({length: table.type.chairsBottom}, (_, i) => ({
                    cx: table.x + 15 + i * 30,
                    cy: table.y + table.type.width + 20
                })),
                right: Array.from({length: table.type.chairsTop}, (_, i) => ({
                    cx: table.x + 15 + i * 30,
                    cy: table.y - 20
                }))
            },
            180: {
                top: Array.from({length: table.type.chairsBottom}, (_, i) => ({
                    cx: table.x + 15 + i * 30,
                    cy: table.y + table.type.height + 20
                })),
                bottom: Array.from({length: table.type.chairsTop}, (_, i) => ({
                    cx: table.x + 15 + i * 30,
                    cy: table.y - 20
                })),
                left: Array.from({length: table.type.chairsRight}, (_, i) => ({
                    cx: table.x + table.type.width + 20,
                    cy: table.y + 15 + i * 30
                })),
                right: Array.from({length: table.type.chairsLeft}, (_, i) => ({
                    cx: table.x - 20,
                    cy: table.y + 15 + i * 30
                }))
            },
            270: {
                top: Array.from({length: table.type.chairsLeft}, (_, i) => ({
                    cx: table.x - 20,
                    cy: table.y + 15 + i * 30
                })),
                bottom: Array.from({length: table.type.chairsRight}, (_, i) => ({
                    cx: table.x + table.type.width + 20,
                    cy: table.y + 15 + i * 30
                })),
                left: Array.from({length: table.type.chairsTop}, (_, i) => ({
                    cx: table.x + 15 + i * 30,
                    cy: table.y - 20
                })),
                right: Array.from({length: table.type.chairsBottom}, (_, i) => ({
                    cx: table.x + 15 + i * 30,
                    cy: table.y + table.type.height + 20
                }))
            }
        };

        const chairs = chairPositions[table.rotation] || chairPositions[0];

        return (
            <>
                {chairs.top && chairs.top.map((chair, i) => (
                    <Chair key={`top-${i}`} cx={chair.cx} cy={chair.cy} color={table.isActive ? "#b5651d" : "#808080"}/>
                ))}
                {chairs.bottom && chairs.bottom.map((chair, i) => (
                    <Chair key={`bottom-${i}`} cx={chair.cx} cy={chair.cy}
                           color={table.isActive ? "#b5651d" : "#808080"}/>
                ))}
                {chairs.left && chairs.left.map((chair, i) => (
                    <Chair key={`left-${i}`} cx={chair.cx} cy={chair.cy}
                           color={table.isActive ? "#b5651d" : "#808080"}/>
                ))}
                {chairs.right && chairs.right.map((chair, i) => (
                    <Chair key={`right-${i}`} cx={chair.cx} cy={chair.cy}
                           color={table.isActive ? "#b5651d" : "#808080"}/>
                ))}
            </>
        );
    };

    // Render door with swing
    const renderDoor = (door) => {
        // Calculate center of the door for rotation transform
        const centerX = door.x + door.width / 2;
        const centerY = door.y + door.height / 2;
        const rotation = door.rotation || 0;

        let pathD;

        // Always draw the arc on the "top" side based on door's rotation
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
            <g>
                <rect
                    x={door.x}
                    y={door.y}
                    width={door.width}
                    height={door.height}
                    className="door"
                    transform={`rotate(${rotation}, ${centerX}, ${centerY})`}
                />
                <path
                    d={pathD}
                    className="door-arc"
                    transform={`rotate(${rotation}, ${centerX}, ${centerY})`}
                />
            </g>
        );
    };

    // Save floor plan to JSON
    const saveFloorPlan = () => {
        const floorPlanData = {
            tables,
            walls,
            doors,
            windows,
            dimensions: svgDimensions
        };

        // You can send this to your backend or local storage
        console.log(JSON.stringify(floorPlanData));
        return floorPlanData;
    };

    // Handle canvas resize
    const handleCanvasResize = () => {
        // Update SVG dimensions
        setSvgDimensions({
            width: canvasWidth,
            height: canvasHeight
        });

        // Close resize controls
        setShowResizeControls(false);
    };

    return (
        <div>
            <button
                className="edit-button"
                onClick={() => setEditMode(!editMode)}
            >
                {editMode ? "View Mode" : "Edit Mode"}
            </button>

            {editMode ?
                <div style={{position: 'absolute', top: '10px', right: '150px', zIndex: 100}}>
                    <button
                        className="edit-button"
                        onClick={() => setShowResizeControls(!showResizeControls)}
                    >
                        Resize Canvas
                    </button>
                </div> : null
            }
            {/* Canvas Resize Controls */}
            {showResizeControls && (
                <div className="resize-canvas-controls">
                    <div>
                        <label htmlFor="canvas-width">Width:</label>
                        <input
                            id="canvas-width"
                            type="number"
                            min="200"
                            max="2000"
                            value={canvasWidth}
                            onChange={(e) => setCanvasWidth(parseInt(e.target.value) || 800)}
                        />
                    </div>
                    <div>
                        <label htmlFor="canvas-height">Height:</label>
                        <input
                            id="canvas-height"
                            type="number"
                            min="200"
                            max="2000"
                            value={canvasHeight}
                            onChange={(e) => setCanvasHeight(parseInt(e.target.value) || 600)}
                        />
                    </div>
                    <button onClick={handleCanvasResize}>Apply</button>
                </div>
            )}

            <div className="floor-plan-designer">
                {editMode && (
                    <div className="controls">
                        <button
                            onClick={() => setCurrentDrawingMode(DrawingMode.SELECT)}
                            className={currentDrawingMode === DrawingMode.SELECT ? 'active' : ''}
                        >
                            Select
                        </button>
                        <button
                            onClick={() => setCurrentDrawingMode(DrawingMode.TABLE)}
                            className={currentDrawingMode === DrawingMode.TABLE ? 'active' : ''}
                        >
                            Add Table
                        </button>
                        <select
                            value={Object.keys(tableTypes).find(key => tableTypes[key] === selectedTableType) || 'medium1'}
                            onChange={(e) => setSelectedTableType(tableTypes[e.target.value])}
                        >
                            {Object.keys(tableTypes).map(key => (
                                <option key={key} value={key}>{key}</option>
                            ))}
                        </select>

                        {/* Table Preview Display */}
                        {currentDrawingMode === DrawingMode.TABLE && renderTablePreview()}

                        <button
                            onClick={() => setCurrentDrawingMode(DrawingMode.WALL)}
                            className={currentDrawingMode === DrawingMode.WALL ? 'active' : ''}
                        >
                            Add Wall
                        </button>
                        <button
                            onClick={() => setCurrentDrawingMode(DrawingMode.DOOR)}
                            className={currentDrawingMode === DrawingMode.DOOR ? 'active' : ''}
                        >
                            Add Door
                        </button>
                        <button
                            onClick={() => setCurrentDrawingMode(DrawingMode.WINDOW)}
                            className={currentDrawingMode === DrawingMode.WINDOW ? 'active' : ''}
                        >
                            Add Window
                        </button>
                        {/*<button onClick={saveFloorPlan}>*/}
                        {/*    Save Floor Plan*/}
                        {/*</button>*/}
                    </div>
                )}

                <svg
                    ref={svgRef}
                    width={svgDimensions.width}
                    height={svgDimensions.height}
                    onClick={(e) => {
                        if (!editMode) return;

                        switch (currentDrawingMode) {
                            case DrawingMode.TABLE:
                                addTable(e);
                                break;
                            case DrawingMode.DOOR:
                                addDoor(e);
                                break;
                            case DrawingMode.WINDOW:
                                addWindow(e);
                                break;
                            default:
                                // Clicking on empty space clears the selection
                                setSelectedElement(null);
                                setElementDetailsPosition(null);
                                break;
                        }
                    }}
                    onMouseDown={(e) => {
                        if (!editMode) return;

                        if (currentDrawingMode === DrawingMode.WALL) {
                            startDrawWall(e);
                        }
                    }}
                    onMouseUp={(e) => {
                        if (!editMode) return;

                        if (currentDrawingMode === DrawingMode.WALL) {
                            endDrawWall(e);
                        }

                        stopDragging();
                    }}
                    onMouseMove={(e) => {
                        if (!editMode) return;

                        if (startPoint && currentDrawingMode === DrawingMode.WALL) {
                            // Update temporary wall preview
                            const point = getCursorPosition(e);
                            const tmpWall = document.getElementById("temp-wall");
                            if (tmpWall) {
                                tmpWall.setAttribute("x2", point.x);
                                tmpWall.setAttribute("y2", point.y);
                            }
                        } else {
                            dragElement(e);
                        }
                    }}
                    onMouseLeave={() => {
                        if (editMode) {
                            stopDragging();
                        }
                    }}
                    style={{border: '1px solid #ccc'}}
                >
                    {/* Walls */}
                    {walls.map(wall => (
                        <g key={wall.id}>
                            <line
                                x1={wall.x1}
                                y1={wall.y1}
                                x2={wall.x2}
                                y2={wall.y2}
                                className="wall"
                                onClick={(e) => editMode && showElementDetails(wall, 'wall', e)}
                                onMouseDown={(e) => editMode && startDragElement(wall, e, 'wall')}
                            />
                            <text
                                x={(wall.x1 + wall.x2) / 2}
                                y={(wall.y1 + wall.y2) / 2 + 15}
                                className="table-id"
                            >
                                #{wall.intId}
                            </text>
                            {/* Resize handle for wall */}
                            {editMode && (
                                <circle
                                    cx={wall.x2}
                                    cy={wall.y2}
                                    r="5"
                                    className="resize-handle"
                                    onMouseDown={(e) => startResize(wall, e, 'wall')}
                                />
                            )}
                        </g>
                    ))}

                    {/* Tables */}
                    {tables.map(table => (
                        <g key={table.id}>
                            <rect
                                x={table.x}
                                y={table.y}
                                width={table.type.width}
                                height={table.type.height}
                                {...table.isActive ? {fill: "#8B4513"} : {fill: "#808080"}}
                                stroke="black"
                                transform={`rotate(${table.rotation || 0}, ${table.x + table.type.width / 2}, ${table.y + table.type.height / 2})`}
                                onClick={(e) => editMode && showElementDetails(table, 'table', e)}
                                onMouseDown={(e) => editMode && startDragElement(table, e, 'table')}
                            />

                            {renderChairs(table)}

                            <text
                                x={table.x + table.type.width / 2}
                                y={table.y + table.type.height / 2}
                                className="table-id"
                            >
                                #{table.intId}
                            </text>
                        </g>
                    ))}

                    {/* Doors */}
                    {doors.map(door => (
                        <g key={door.id}>
                            {renderDoor(door)}
                            <text
                                x={door.x + door.width / 2}
                                y={door.y + door.height + 15}
                                className="table-id"
                            >
                                D#{door.intId}
                            </text>
                            <rect
                                x={door.x}
                                y={door.y}
                                width={door.width}
                                height={door.height}
                                fill="transparent"
                                onClick={(e) => editMode && showElementDetails(door, 'door', e)}
                                onMouseDown={(e) => editMode && startDragElement(door, e, 'door')}
                                transform={`rotate(${door.rotation || 0}, ${door.x + door.width / 2}, ${door.y + door.height / 2})`}
                            />
                            {/* Resize handle for door */}
                            {editMode && (
                                <rect
                                    x={door.x + door.width - 10}
                                    y={door.y + door.height - 10}
                                    width="10"
                                    height="10"
                                    className="resize-handle"
                                    transform={`rotate(${door.rotation || 0}, ${door.x + door.width / 2}, ${door.y + door.height / 2})`}
                                    onMouseDown={(e) => startResize(door, e, 'door')}
                                />
                            )}
                        </g>
                    ))}

                    {/* Windows */}
                    {windows.map(window => (
                        <g key={window.id}>
                            <rect
                                x={window.x}
                                y={window.y}
                                width={window.width}
                                height={window.height}
                                className="window"
                                transform={`rotate(${window.rotation || 0}, ${window.x + window.width / 2}, ${window.y + window.height / 2})`}
                                onClick={(e) => editMode && showElementDetails(window, 'window', e)}
                                onMouseDown={(e) => editMode && startDragElement(window, e, 'window')}
                            />
                            <text
                                x={window.x + window.width / 2}
                                y={window.y + window.height + 15}
                                className="table-id"
                            >
                                W#{window.intId}
                            </text>
                            {/* Resize handle for window */}
                            {editMode && (
                                <rect
                                    x={window.x + window.width - 10}
                                    y={window.y + window.height - 10}
                                    width="10"
                                    height="10"
                                    className="resize-handle"
                                    transform={`rotate(${window.rotation || 0}, ${window.x + window.width / 2}, ${window.y + window.height / 2})`}
                                    onMouseDown={(e) => startResize(window, e, 'window')}
                                />
                            )}
                        </g>
                    ))}

                    {/* Temporary wall line while drawing */}
                    {startPoint && currentDrawingMode === DrawingMode.WALL && (
                        <line
                            id="temp-wall"
                            x1={startPoint.x}
                            y1={startPoint.y}
                            x2={startPoint.x}
                            y2={startPoint.y}
                            stroke="black"
                            strokeWidth="3"
                            strokeDasharray="5,5"
                        />
                    )}
                </svg>

                {/* Element Details */}
                {selectedElement && elementDetailsPosition && (
                    <div
                        className="element-details"
                        style={{
                            position: 'absolute',
                            left: elementDetailsPosition.x,
                            top: elementDetailsPosition.y
                        }}
                    >
                        <h3>{selectedElement.type.charAt(0).toUpperCase() + selectedElement.type.slice(1)} #{selectedElement.intId}</h3>
                        <p>
                            Position: (
                            {selectedElement.x !== undefined
                                ? `${Math.round(selectedElement.x)}, ${Math.round(selectedElement.y)}`
                                : `${Math.round(selectedElement.x1)}, ${Math.round(selectedElement.y1)}`}
                            )
                        </p>
                        <p>Rotation: {selectedElement.rotation || 0}°</p>
                        <button onClick={() => rotateElement(selectedElement)}>
                            Rotate
                        </button>
                        <button onClick={() => deleteElement(selectedElement)}>
                            Delete
                        </button>

                        {selectedElement.type === 'table' && (
                            <>
                                {!selectedElement.isActive ? (
                                    <button onClick={() => activateTable(selectedElement)}>
                                        Activate
                                    </button>) : (
                                    <button onClick={() => deactivateTable(selectedElement)}>
                                        Deactivate
                                    </button>
                                )
                                }
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FloorPlanDesigner;