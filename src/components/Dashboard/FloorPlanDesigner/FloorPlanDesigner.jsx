import React, {useState} from 'react';
import ControlPanel from './components/ControlPanel';
import ElementDetails from './components/ElementDetails';
import TableNumberModal from './components/TableNumberModal'; // Import the new component
import {tableTypes} from '../../../constants/tableTypes';
import {DrawingMode} from '../../../constants/drawingModes';
import FloorPlanCanvas from './components/FloorPlanCanvas';

// Import custom hooks
import {useFloorPlanData} from './hooks/useFloorPlanData';
import {useElementHandlers} from './hooks/useElementHandlers';
import {useCanvasUtils} from './hooks/useCanvasUtils';

import './FloorPlanDesigner.css';

/**
 * FloorPlanDesigner component
 *
 * This component is responsible for rendering and managing the floor plan editor.
 * The logic has been refactored into custom hooks to reduce complexity and improve maintainability:
 *
 * - useFloorPlanData.js: Manages all data fetching and state for tables, walls, doors, and windows
 * - useElementHandlers: Contains all the logic for manipulating elements (add, drag, resize, etc.)
 * - useCanvasUtils: Provides utility functions for working with the SVG canvas
 */
const FloorPlanDesigner = ({ editMode }) => {
    // Drawing mode and table type selection
    const [currentDrawingMode, setCurrentDrawingMode] = useState(DrawingMode.SELECT);
    const [selectedTableType, setSelectedTableType] = useState(tableTypes.medium1);

    // State for the table number modal
    const [showTableModal, setShowTableModal] = useState(false);
    const [tableModalPosition, setTableModalPosition] = useState({ x: 0, y: 0 });
    const [pendingTableEvent, setPendingTableEvent] = useState(null);

    // Use custom hooks to manage state and logic
    const {svgRef, svgDimensions, getCursorPosition, handleBackgroundClick} = useCanvasUtils();

    const {
        tables, setTables,
        walls, setWalls,
        doors, setDoors,
        windows, setWindows
    } = useFloorPlanData();

    const {
        isDragging,
        draggedItem,
        selectedElement,
        elementDetailsPosition,
        startPoint,
        deletingElements,
        activatingTables,
        deactivatingTables,

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
        setSelectedElement,
        setElementDetailsPosition
    } = useElementHandlers(
        tables, setTables,
        walls, setWalls,
        doors, setDoors,
        windows, setWindows,
        getCursorPosition
    );

    // Modified handler for adding a table
    const handleAddTable = (event) => {
        if (currentDrawingMode !== DrawingMode.TABLE) return;

        // Save the event for later use when modal is confirmed
        setPendingTableEvent(event);

        // Show the modal at the click position
        setTableModalPosition({
            x: event.clientX,
            y: event.clientY
        });
        setShowTableModal(true);
    };

    // Handler for modal confirmation
    const handleTableModalConfirm = (tableNum) => {
        if (pendingTableEvent && tableNum) {
            // Call the addTable function with the saved event, current drawing mode, selected table type, and the table number
            addTable(pendingTableEvent, currentDrawingMode, selectedTableType, tableNum);
        }

        // Reset the modal state
        setShowTableModal(false);
        setPendingTableEvent(null);
    };

    // Handler for modal cancellation
    const handleTableModalCancel = () => {
        setShowTableModal(false);
        setPendingTableEvent(null);
    };

    // Other event handler functions that bind current drawing mode and selected table type
    const handleStartDrawWall = (event) => startDrawWall(event, currentDrawingMode);
    const handleEndDrawWall = (event) => endDrawWall(event, currentDrawingMode);
    const handleAddDoor = (event) => addDoor(event, currentDrawingMode);
    const handleAddWindow = (event) => addWindow(event, currentDrawingMode);
    const handleStartDragElement = (element, event, type) =>
        startDragElement(element, event, type, currentDrawingMode);
    const handleShowElementDetails = (element, type, event) =>
        showElementDetails(element, type, event, currentDrawingMode);
    const handleBackgroundClicks = (e) =>
        handleBackgroundClick(e, setSelectedElement, setElementDetailsPosition);

    return (
        <div>
            <div className="floor-plan-designer" onClick={handleBackgroundClicks}>
                {editMode && (
                    <ControlPanel
                        currentDrawingMode={currentDrawingMode}
                        setCurrentDrawingMode={setCurrentDrawingMode}
                        selectedTableType={selectedTableType}
                        setSelectedTableType={setSelectedTableType}
                        tableTypes={tableTypes}
                        DrawingMode={DrawingMode}
                    />
                )}

                <FloorPlanCanvas
                    svgRef={svgRef}
                    svgDimensions={svgDimensions}
                    editMode={editMode}
                    currentDrawingMode={currentDrawingMode}
                    tables={tables}
                    walls={walls}
                    doors={doors}
                    windows={windows}
                    startPoint={startPoint}
                    isDragging={isDragging}
                    draggedItem={draggedItem}
                    addTable={handleAddTable} // Use the modified handler
                    addDoor={handleAddDoor}
                    addWindow={handleAddWindow}
                    startDrawWall={handleStartDrawWall}
                    endDrawWall={handleEndDrawWall}
                    stopDragging={stopDragging}
                    dragElement={dragElement}
                    startDragElement={handleStartDragElement}
                    showElementDetails={handleShowElementDetails}
                    startResize={startResize}
                    deletingElements={deletingElements}
                    activatingTables={activatingTables}
                    deactivatingTables={deactivatingTables}
                />

                {selectedElement && elementDetailsPosition && (
                    <ElementDetails
                        selectedElement={selectedElement}
                        elementDetailsPosition={elementDetailsPosition}
                        rotateElement={rotateElement}
                        deleteElement={deleteElement}
                        activateTable={activateTable}
                        deactivateTable={deactivateTable}
                        onClose={() => {
                            setSelectedElement(null);
                            setElementDetailsPosition(null);
                        }}
                    />
                )}

                {/* Render the table number modal when showTableModal is true */}
                {showTableModal && (
                    <TableNumberModal
                        position={tableModalPosition}
                        onConfirm={handleTableModalConfirm}
                        onCancel={handleTableModalCancel}
                    />
                )}
            </div>
        </div>
    );
}

export default FloorPlanDesigner;