import React from 'react';

const WallComponent = ({
                           wall,
                           editMode,
                           showElementDetails,
                           startDragElement,
                           startResize
                       }) => {
    return (
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
            {}
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
    );
};

export default WallComponent;