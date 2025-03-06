import { useRef, useState } from 'react';

export const useCanvasUtils = () => {
    const svgRef = useRef(null);
    const [svgDimensions] = useState({ width: 800, height: 600 });
    const [controlPanelOpen, setControlPanelOpen] = useState(true);

    // Get cursor position relative to SVG
    const getCursorPosition = (event) => {
        const svg = svgRef.current;
        if (!svg) return { x: 0, y: 0 };

        const point = svg.createSVGPoint();
        point.x = event.clientX;
        point.y = event.clientY;
        return point.matrixTransform(svg.getScreenCTM().inverse());
    };

    // Handle clicks on the background to close the control panel
    const handleBackgroundClick = (e, setSelectedElement, setElementDetailsPosition) => {
        // Only handle if clicking directly on the floor-plan-designer div
        if (e.target.className === 'floor-plan-designer') {
            setControlPanelOpen(false);
            // Also clear any selected element
            setSelectedElement(null);
            setElementDetailsPosition(null);
        }
    };

    return {
        svgRef,
        svgDimensions,
        controlPanelOpen,
        setControlPanelOpen,
        getCursorPosition,
        handleBackgroundClick
    };
};