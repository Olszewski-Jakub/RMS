import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import tableService from "../../../../services/table.service";
import wallsService from "../../../../services/walls.service";
import doorService from "../../../../services/door.service";
import windowService from "../../../../services/window.service";
import { DrawingMode } from '../../../../constants/drawingModes';

export const useElementHandlers = (tables, setTables, walls, setWalls, doors, setDoors, windows, setWindows, getCursorPosition) => {
    const [isDragging, setIsDragging] = useState(false);
    const [draggedItem, setDraggedItem] = useState(null);
    const [selectedElement, setSelectedElement] = useState(null);
    const [elementDetailsPosition, setElementDetailsPosition] = useState(null);
    const [startPoint, setStartPoint] = useState(null);
    const [isResizing, setIsResizing] = useState(false);
    const [resizeElement, setResizeElement] = useState(null);
    const [resizeStartPoint, setResizeStartPoint] = useState(null);
    const [deletingElements] = useState([]);
    const [activatingTables, setActivatingTables] = useState([]);
    const [deactivatingTables, setDeactivatingTables] = useState([]);

    // Table methods
    const addTable = async (event, currentDrawingMode, selectedTableType) => {
        if (currentDrawingMode !== DrawingMode.TABLE) return;

        const { x, y } = getCursorPosition(event);

        try {
            const seats = selectedTableType.chairsTop + selectedTableType.chairsBottom +
                selectedTableType.chairsLeft + selectedTableType.chairsRight;

            const tableId = await tableService.create(
                seats,
                false,
                x - selectedTableType.width / 2,
                y - selectedTableType.height / 2,
                0,
                selectedTableType.name
            );

            const newTable = {
                id: uuidv4(),
                intId: tableId.id,
                x: x - selectedTableType.width / 2,
                y: y - selectedTableType.height / 2,
                type: selectedTableType,
                isActive: true,
                rotation: 0,
                isNew: true // Mark as new for animation
            };
            setTables([...tables, newTable]);

            // Remove the isNew flag after animation completes
            setTimeout(() => {
                setTables(tables =>
                    tables.map(table =>
                        table.id === newTable.id ? { ...table, isNew: false } : table
                    )
                );
            }, 500);
        } catch (e) {
            console.log(e);
        }
    };

    const activateTable = async (element) => {
        try {
            // Add table to activating list for animation
            setActivatingTables([...activatingTables, element.id]);

            // Update UI state immediately for better user experience
            setTables(tables.map(table =>
                table.id === element.id ? { ...table, isActive: true } : table
            ));

            // Also update the selected element's state so the button updates
            if (selectedElement && selectedElement.id === element.id) {
                setSelectedElement({
                    ...selectedElement,
                    isActive: true
                });
            }

            // Then make the API call
            await tableService.activate(element.intId);

            // Remove from activating list after animation duration
            setTimeout(() => {
                setActivatingTables(activatingTables =>
                    activatingTables.filter(id => id !== element.id)
                );
            }, 700);
        } catch (error) {
            console.error('Error activating table:', error);
            // Revert the state change if the API call fails
            setTables(tables.map(table =>
                table.id === element.id ? { ...table, isActive: false } : table
            ));
            if (selectedElement && selectedElement.id === element.id) {
                setSelectedElement({
                    ...selectedElement,
                    isActive: false
                });
            }
            // Remove from activating list
            setActivatingTables(activatingTables =>
                activatingTables.filter(id => id !== element.id)
            );
        }
    };

    const deactivateTable = async (element) => {
        try {
            // Add table to deactivating list for animation
            setDeactivatingTables([...deactivatingTables, element.id]);

            // Update UI state immediately for better user experience
            setTables(tables.map(table =>
                table.id === element.id ? { ...table, isActive: false } : table
            ));

            // Also update the selected element's state so the button updates
            if (selectedElement && selectedElement.id === element.id) {
                setSelectedElement({
                    ...selectedElement,
                    isActive: false
                });
            }

            // Then make the API call
            await tableService.deactivate(element.intId);

            // Remove from deactivating list after animation duration
            setTimeout(() => {
                setDeactivatingTables(deactivatingTables =>
                    deactivatingTables.filter(id => id !== element.id)
                );
            }, 700);
        } catch (error) {
            console.error('Error deactivating table:', error);
            // Revert the state change if the API call fails
            setTables(tables.map(table =>
                table.id === element.id ? { ...table, isActive: true } : table
            ));
            if (selectedElement && selectedElement.id === element.id) {
                setSelectedElement({
                    ...selectedElement,
                    isActive: true
                });
            }
            // Remove from deactivating list
            setDeactivatingTables(deactivatingTables =>
                deactivatingTables.filter(id => id !== element.id)
            );
        }
    };

    // Wall methods
    const startDrawWall = (event, currentDrawingMode) => {
        if (currentDrawingMode !== DrawingMode.WALL) return;
        const { x, y } = getCursorPosition(event);
        setStartPoint({ x, y });
    };

    const endDrawWall = async (event, currentDrawingMode) => {
        if (currentDrawingMode !== DrawingMode.WALL || !startPoint) return;
        const { x, y } = getCursorPosition(event);

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

            try {
                const wallId = await wallsService.create(newWall.x1, newWall.y1, newWall.x2, newWall.y2);
                newWall.intId = wallId.id;
                setWalls([...walls, newWall]);
            } catch (e) {
                console.log(e);
            }
        }
        setStartPoint(null);
    };

    // Door methods
    const addDoor = async (event, currentDrawingMode) => {
        if (currentDrawingMode !== DrawingMode.DOOR) return;

        const { x, y } = getCursorPosition(event);
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

        try {
            const doorId = await doorService.create(
                newDoor.x,
                newDoor.y,
                newDoor.width,
                newDoor.height,
                newDoor.rotation
            );
            newDoor.intId = doorId.id;
            setDoors([...doors, newDoor]);
        } catch (e) {
            console.log(e);
        }
    };

    // Window methods
    const addWindow = async (event, currentDrawingMode) => {
        if (currentDrawingMode !== DrawingMode.WINDOW) return;

        const { x, y } = getCursorPosition(event);
        const newWindow = {
            id: uuidv4(),
            intId: windows.length > 0 ? Math.max(...windows.map(w => w.intId || 0), 0) + 1 : 1,
            x,
            y,
            width: 60,
            height: 10,
            rotation: 0
        };

        try {
            const windowId = await windowService.create(
                newWindow.x,
                newWindow.y,
                newWindow.width,
                newWindow.height,
                newWindow.rotation
            );
            newWindow.intId = windowId.id;
            setWindows([...windows, newWindow]);
        } catch (e) {
            console.log(e);
        }
    };

    // Shared element methods
    const startDragElement = (element, event, type, currentDrawingMode) => {
        if (currentDrawingMode !== DrawingMode.SELECT) return;

        event.stopPropagation();
        setIsDragging(true);

        const { x, y } = getCursorPosition(event);

        // Calculate offset from the cursor to the element origin
        let offsetX, offsetY;

        if (type === 'wall') {
            offsetX = x - element.x1;
            offsetY = y - element.y1;
        } else {
            offsetX = x - element.x;
            offsetY = y - element.y;
        }

        // Set the dragged item with all necessary info
        setDraggedItem({
            ...element,
            type,
            offsetX,
            offsetY,
            initialX: element.x,  // Store initial position for reference
            initialY: element.y
        });
    };

    const dragElement = (event) => {
        if (isResizing && resizeElement) {
            handleResize(event);
            return;
        }

        if (!isDragging || !draggedItem) return;

        const { x, y } = getCursorPosition(event);

        switch (draggedItem.type) {
            case 'table':
                // Simply update the table position directly, letting the SVG handle the rotation
                const newX = x - draggedItem.offsetX;
                const newY = y - draggedItem.offsetY;

                const updatedTables = tables.map(table =>
                    table.id === draggedItem.id
                        ? { ...table, x: newX, y: newY }
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
                        ? { ...door, x: x - draggedItem.offsetX, y: y - draggedItem.offsetY }
                        : door
                );
                setDoors(updatedDoors);
                break;

            case 'window':
                const updatedWindows = windows.map(window =>
                    window.id === draggedItem.id
                        ? { ...window, x: x - draggedItem.offsetX, y: y - draggedItem.offsetY }
                        : window
                );
                setWindows(updatedWindows);
                break;

            default:
                break;
        }
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
                        updatedTable.isActive,
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
        setResizeElement({ ...element, type });
        setResizeStartPoint(getCursorPosition(event));
    };

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
                        ? { ...wall, x2: wall.x2 + dx, y2: wall.y2 + dy }
                        : wall
                );
                setWalls(updatedWalls);
                break;
            case 'door':
                const updatedDoors = doors.map(door =>
                    door.id === resizeElement.id
                        ? { ...door, width: Math.max(30, door.width + dx), height: Math.max(10, door.height + dy) }
                        : door
                );
                setDoors(updatedDoors);
                break;
            case 'window':
                const updatedWindows = windows.map(window =>
                    window.id === resizeElement.id
                        ? { ...window, width: Math.max(20, window.width + dx), height: Math.max(5, window.height + dy) }
                        : window
                );
                setWindows(updatedWindows);
                break;
        }

        setResizeStartPoint(currentPoint);
    };

    const rotateElement = (element) => {
        switch (element.type) {
            case 'table':
                const updatedTables = tables.map(table =>
                    table.id === element.id
                        ? { ...table, rotation: (table.rotation + 90) % 360 }
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
                // Door rotation properly swaps width and height
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

    const deleteElement = (element) => {
        switch (element.type) {
            case 'table':
                tableService.delete(element.intId);
                setTables(tables.filter(table => table.id !== element.id));
                break;
            case 'wall':
                wallsService.delete(element.intId);
                setWalls(walls.filter(wall => wall.id !== element.id));
                break;
            case 'door':
                doorService.delete(element.intId);
                setDoors(doors.filter(door => door.id !== element.id));
                break;
            case 'window':
                windowService.delete(element.intId);
                setWindows(windows.filter(window => window.id !== element.id));
                break;
        }
        setSelectedElement(null);
        setElementDetailsPosition(null);
    };

    const showElementDetails = (element, type, event, currentDrawingMode) => {
        event.stopPropagation();
        if (currentDrawingMode !== DrawingMode.SELECT) return;

        setSelectedElement({ ...element, type });
        setElementDetailsPosition({
            x: event.clientX,
            y: event.clientY
        });
    };

    // Save floor plan
    const saveFloorPlan = (svgDimensions) => {
        const floorPlanData = {
            tables,
            walls,
            doors,
            windows,
            dimensions: svgDimensions
        };
        console.log(JSON.stringify(floorPlanData));
        return floorPlanData;
    };

    return {
        // States
        isDragging,
        draggedItem,
        selectedElement,
        elementDetailsPosition,
        startPoint,
        isResizing,
        resizeElement,
        deletingElements,
        activatingTables,
        deactivatingTables,

        // Methods
        addTable,
        startDrawWall,
        endDrawWall,
        addDoor,
        addWindow,
        startDragElement,
        dragElement,
        stopDragging,
        startResize,
        rotateElement,
        deleteElement,
        activateTable,
        deactivateTable,
        showElementDetails,
        saveFloorPlan,
        setSelectedElement,
        setElementDetailsPosition
    };
};