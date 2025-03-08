import React, { useEffect, useState } from 'react';
import TableWithChairs from '../../../FloorPlan/components/TableWithChairs';

const TableComponent = ({
                            table,
                            editMode,
                            currentDrawingMode,
                            isDragging,
                            draggedItem,
                            showElementDetails,
                            startDragElement,
                            svgRef,
                            isNew,
                            isDeleting,
                            isActivating,
                            isDeactivating
                        }) => {
    const [animated, setAnimated] = useState(isNew);
    const [deleteAnimated, setDeleteAnimated] = useState(isDeleting);
    const [activateAnimated, setActivateAnimated] = useState(isActivating);
    const [deactivateAnimated, setDeactivateAnimated] = useState(isDeactivating);

    // Trigger animation when new table is created
    useEffect(() => {
        if (animated) {
            // Remove animation class after animation completes
            const timer = setTimeout(() => {
                setAnimated(false);
            }, 500); // Match this to your animation duration
            return () => clearTimeout(timer);
        }
    }, [animated]);

    // Trigger animation when table is deleted
    useEffect(() => {
        if (deleteAnimated) {
            // Animation duration before element is actually removed
            const timer = setTimeout(() => {
                setDeleteAnimated(false);
            }, 400); // Match this to your animation duration
            return () => clearTimeout(timer);
        }
    }, [deleteAnimated]);

    // Trigger animation when table is activated
    useEffect(() => {
        if (activateAnimated) {
            const timer = setTimeout(() => {
                setActivateAnimated(false);
            }, 700);
            return () => clearTimeout(timer);
        }
    }, [activateAnimated]);

    // Trigger animation when table is deactivated
    useEffect(() => {
        if (deactivateAnimated) {
            const timer = setTimeout(() => {
                setDeactivateAnimated(false);
            }, 700);
            return () => clearTimeout(timer);
        }
    }, [deactivateAnimated]);

    // Apply the appropriate animation class
    const getAnimationClass = () => {
        if (animated) return 'table-new-animation';
        if (deleteAnimated) return 'table-delete-animation';
        if (activateAnimated) return 'table-activate-animation';
        if (deactivateAnimated) return 'table-deactivate-animation';
        return '';
    };

    return (
        <g
            key={table.id}
            onMouseDown={(e) => {
                if (editMode && currentDrawingMode === 'select') {
                    e.stopPropagation();
                    startDragElement(table, e, 'table');
                }
            }}
            onClick={(e) => {
                if (editMode && currentDrawingMode === 'select') {
                    e.stopPropagation();
                    showElementDetails(table, 'table', e);
                }
            }}
            className={`table-container ${getAnimationClass()}`}
            style={{
                pointerEvents: editMode ? 'all' : 'none',
                // Turn off CSS transitions during dragging for immediate updates
                transition: isDragging ? 'none' : 'all 0.2s',
            }}
        >
            <TableWithChairs
                id={table.intId}
                x={table.x}
                y={table.y}
                tableType={table.type}
                isAvailable={table.isActive}
                rotation={table.rotation || 0}
                label={table.tabeleNum}
                onClick={(id, seats) => {
                    if (editMode && currentDrawingMode === 'select') {
                        // Get the SVG element
                        const svg = svgRef.current;

                        // Calculate the table's center point in SVG coordinates
                        const tableCenterX = table.x + table.type.width / 2;
                        const tableCenterY = table.y + table.type.height / 2;

                        // Create an SVG point at the table's center
                        const svgPoint = svg.createSVGPoint();
                        svgPoint.x = tableCenterX;
                        svgPoint.y = tableCenterY;

                        // Convert SVG coordinates to screen coordinates
                        const screenPoint = svgPoint.matrixTransform(svg.getScreenCTM());

                        // Use the converted screen coordinates for the popup
                        showElementDetails(table, 'table', {
                            clientX: screenPoint.x,
                            clientY: screenPoint.y,
                            stopPropagation: () => {}
                        });
                    }
                }}
                isMobile={window.innerWidth <= 768}
                isDragging={isDragging && draggedItem && draggedItem.id === table.id}
            />
        </g>
    );
};

export default TableComponent;