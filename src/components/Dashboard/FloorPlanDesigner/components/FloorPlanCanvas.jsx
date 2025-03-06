import React from 'react';
import TableComponent from './TableComponent';
import WallComponent from './WallComponent';
import DoorComponent from './DoorComponent';
import WindowComponent from './WindowComponent';
import {DrawingMode} from "../../../../constants/drawingModes";

const FloorPlanCanvas = ({
                             svgRef,
                             svgDimensions,
                             editMode,
                             currentDrawingMode,
                             tables,
                             walls,
                             doors,
                             windows,
                             startPoint,
                             isDragging,
                             draggedItem,
                             addTable,
                             addDoor,
                             addWindow,
                             startDrawWall,
                             endDrawWall,
                             stopDragging,
                             dragElement,
                             startDragElement,
                             showElementDetails,
                             startResize
                         }) => {
    return (
        <svg
            ref={svgRef}
            width={svgDimensions.width}
            height={svgDimensions.height}
            onClick={(e) => {
                if (!editMode) return;

                // Don't propagate clicks from SVG to parent container
                e.stopPropagation();

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
            style={{ border: '1px solid #ccc' }}
        >
            {/* Walls */}
            {walls.map(wall => (
                <WallComponent
                    key={wall.id}
                    wall={wall}
                    editMode={editMode}
                    showElementDetails={showElementDetails}
                    startDragElement={startDragElement}
                    startResize={startResize}
                />
            ))}

            {/* Tables */}
            {tables.map(table => (
                <TableComponent
                    key={table.id}
                    table={table}
                    editMode={editMode}
                    currentDrawingMode={currentDrawingMode}
                    isDragging={isDragging}
                    draggedItem={draggedItem}
                    showElementDetails={showElementDetails}
                    startDragElement={startDragElement}
                    svgRef={svgRef}
                    isNew={table.isNew}

                />
            ))}

            {/* Doors */}
            {doors.map(door => (
                <DoorComponent
                    key={door.id}
                    door={door}
                    editMode={editMode}
                    showElementDetails={showElementDetails}
                    startDragElement={startDragElement}
                    startResize={startResize}
                />
            ))}

            {/* Windows */}
            {windows.map(window => (
                <WindowComponent
                    key={window.id}
                    window={window}
                    editMode={editMode}
                    showElementDetails={showElementDetails}
                    startDragElement={startDragElement}
                    startResize={startResize}
                />
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
    );

    // Helper function for getting cursor position
    function getCursorPosition(event) {
        const svg = svgRef.current;
        const point = svg.createSVGPoint();
        point.x = event.clientX;
        point.y = event.clientY;
        return point.matrixTransform(svg.getScreenCTM().inverse());
    }
};

export default FloorPlanCanvas;