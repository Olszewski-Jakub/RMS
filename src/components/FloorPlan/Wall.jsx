import React from 'react';
import PropTypes from 'prop-types';

const Wall = ({
                  x1,
                  y1,
                  x2,
                  y2,
                  thickness = 8,
                  color = '#555',
                  isSelected = false,
                  onClick = () => {},
                  id
              }) => {
    // Calculate the angle of the wall
    const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

    // Calculate the length of the wall
    const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

    // Selection styling
    const selectionColor = '#4299e1';
    const selectionThickness = thickness + 4;

    const handleClick = (e) => {
        e.stopPropagation();
        onClick(id);
    };

    return (
        <g onClick={handleClick}>
            <defs>
                {/* Wall texture pattern */}
                <pattern id={`wall-pattern-${id}`} patternUnits="userSpaceOnUse" width="20" height="20" patternTransform="rotate(45)">
                    <rect width="20" height="20" fill={color} />
                    <rect width="10" height="20" fill={`${color}ee`} />
                    <line x1="0" y1="0" x2="0" y2="20" stroke="#444" strokeWidth="0.5" strokeOpacity="0.1" />
                    <line x1="10" y1="0" x2="10" y2="20" stroke="#444" strokeWidth="0.5" strokeOpacity="0.1" />
                </pattern>

                {/* Shadow filter */}
                <filter id={`wall-shadow-${id}`} x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="1" dy="1" stdDeviation="1" floodOpacity="0.3" />
                </filter>
            </defs>

            {/* Selection highlight if selected */}
            {isSelected && (
                <rect
                    x={-selectionThickness / 2}
                    y={-selectionThickness / 2}
                    width={length + selectionThickness}
                    height={selectionThickness}
                    fill="none"
                    stroke={selectionColor}
                    strokeWidth="2"
                    strokeDasharray="4,2"
                    transform={`translate(${x1}, ${y1}) rotate(${angle})`}
                    style={{ pointerEvents: 'none' }}
                />
            )}

            {/* Wall body */}
            <rect
                x={-thickness / 2}
                y={-thickness / 2}
                width={length + thickness}
                height={thickness}
                fill={`url(#wall-pattern-${id})`}
                stroke="#333"
                strokeWidth="0.5"
                filter={`url(#wall-shadow-${id})`}
                transform={`translate(${x1}, ${y1}) rotate(${angle})`}
                style={{ cursor: 'pointer' }}
            />

            {/* Wall edges for better visual definition */}
            <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#333"
                strokeWidth="0.5"
                strokeLinecap="round"
                transform={`translate(0, ${-thickness/2 + 0.25})`}
            />
            <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#333"
                strokeWidth="0.5"
                strokeLinecap="round"
                transform={`translate(0, ${thickness/2 - 0.25})`}
            />
        </g>
    );
};

Wall.propTypes = {
    x1: PropTypes.number.isRequired,
    y1: PropTypes.number.isRequired,
    x2: PropTypes.number.isRequired,
    y2: PropTypes.number.isRequired,
    thickness: PropTypes.number,
    color: PropTypes.string,
    isSelected: PropTypes.bool,
    onClick: PropTypes.func,
    id: PropTypes.string.isRequired
};

export default Wall;