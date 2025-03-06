import React from 'react';

const WindowComponent = ({
                             window,
                             editMode,
                             showElementDetails,
                             startDragElement,
                             startResize
                         }) => {
    const centerX = window.x + window.width / 2;
    const centerY = window.y + window.height / 2;
    const rotation = window.rotation || 0;

    return (
        <g key={window.id}>
            <rect
                x={window.x}
                y={window.y}
                width={window.width}
                height={window.height}
                className="window"
                transform={`rotate(${rotation}, ${centerX}, ${centerY})`}
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
            {}
            {editMode && (
                <rect
                    x={window.x + window.width - 10}
                    y={window.y + window.height - 10}
                    width="10"
                    height="10"
                    className="resize-handle"
                    transform={`rotate(${rotation}, ${centerX}, ${centerY})`}
                    onMouseDown={(e) => startResize(window, e, 'window')}
                />
            )}
        </g>
    );
};

export default WindowComponent;