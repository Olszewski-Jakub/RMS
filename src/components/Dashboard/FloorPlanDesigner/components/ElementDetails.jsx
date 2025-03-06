import React, { useEffect, useRef } from 'react';

const ElementDetails = ({
                            selectedElement,
                            elementDetailsPosition,
                            rotateElement,
                            deleteElement,
                            activateTable,
                            deactivateTable,
                            onClose
                        }) => {
    const detailsRef = useRef(null);

    // Close panel when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (detailsRef.current && !detailsRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    // Ensure the panel stays within viewport bounds
    const adjustPosition = () => {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        let xPos = elementDetailsPosition.x;
        let yPos = elementDetailsPosition.y;

        // Assumed panel dimensions - adjust as needed
        const panelWidth = 250;
        const panelHeight = 220;

        // Adjust horizontal position if needed
        if (xPos + panelWidth > windowWidth) {
            xPos = windowWidth - panelWidth - 10;
        }

        // Adjust vertical position if needed
        if (yPos + panelHeight > windowHeight) {
            yPos = windowHeight - panelHeight - 10;
        }

        return { left: xPos, top: yPos };
    };

    return (
        <div
            ref={detailsRef}
            className="element-details"
            style={adjustPosition()}
        >
            <div className="element-details-header">
                <h3>{selectedElement.type.charAt(0).toUpperCase() + selectedElement.type.slice(1)} #{selectedElement.intId}</h3>
                <button className="close-button" onClick={onClose}>×</button>
            </div>

            <div className="element-details-content">
                <p>
                    <strong>Position:</strong> (
                    {selectedElement.x !== undefined
                        ? `${Math.round(selectedElement.x)}, ${Math.round(selectedElement.y)}`
                        : `${Math.round(selectedElement.x1)}, ${Math.round(selectedElement.y1)}`}
                    )
                </p>
                <p><strong>Rotation:</strong> {selectedElement.rotation || 0}°</p>

                <div className="element-details-actions">
                    <button
                        className="action-button rotate-button"
                        onClick={() => rotateElement(selectedElement)}
                    >
                        <span className="button-icon">↻</span> Rotate
                    </button>

                    <button
                        className="action-button delete-button"
                        onClick={() => deleteElement(selectedElement)}
                    >
                        <span className="button-icon">✕</span> Delete
                    </button>

                    {selectedElement.type === 'table' && (
                        !selectedElement.isActive ? (
                            <button
                                className="action-button activate-button"
                                onClick={() => activateTable(selectedElement)}
                            >
                                <span className="button-icon">✓</span> Activate
                            </button>
                        ) : (
                            <button
                                className="action-button deactivate-button"
                                onClick={() => deactivateTable(selectedElement)}
                            >
                                <span className="button-icon">✗</span> Deactivate
                            </button>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default ElementDetails;