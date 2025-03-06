import React from 'react';
import PropTypes from 'prop-types';

const Door = ({
                  x,
                  y,
                  width = 80,
                  height = 30,
                  wallThickness = 8,
                  rotation = 0,
                  isOpen = false,
                  openPercentage = 75,
                  doorType = 'hinged', // 'hinged', 'sliding', 'double'
                  isSelected = false,
                  color = '#855E42',
                  onClick = () => {},
                  id
              }) => {
    // Door arc settings
    const openAngle = (openPercentage / 100) * 90;
    const arcRadius = width - wallThickness;

    // Door styles
    const doorColor = color;
    const doorBorder = '#5D4037';
    const handleColor = '#C0C0C0';
    const selectionColor = '#4299e1';

    // Center of door for rotation
    const centerX = x + wallThickness / 2;
    const centerY = y;

    const handleClick = (e) => {
        e.stopPropagation();
        onClick(id);
    };

    // Calculate door swing
    const getDoorSwingPath = () => {
        // For right-hinged door (opens counterclockwise)
        const startX = centerX;
        const startY = centerY;
        const endX = centerX + arcRadius * Math.cos((90 - openAngle) * Math.PI / 180);
        const endY = centerY - arcRadius * Math.sin((90 - openAngle) * Math.PI / 180);

        const largeArcFlag = openAngle > 180 ? 1 : 0;

        return `M ${startX},${startY} A ${arcRadius},${arcRadius} 0 ${largeArcFlag},0 ${endX},${endY}`;
    };

    return (
        <g
            transform={`rotate(${rotation}, ${centerX}, ${centerY})`}
            onClick={handleClick}
        >
            <defs>
                {/* Door texture pattern */}
                <pattern id={`door-pattern-${id}`} patternUnits="userSpaceOnUse" width="30" height="30">
                    <rect width="30" height="30" fill={doorColor} />
                    <rect x="5" y="5" width="20" height="20" fill={`${doorColor}aa`} stroke={doorBorder} strokeWidth="0.5" />
                </pattern>

                {/* Shadow filter */}
                <filter id={`door-shadow-${id}`} x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="1" dy="1" stdDeviation="1" floodOpacity="0.3" />
                </filter>
            </defs>

            {/* Wall cutout (door frame) */}
            <rect
                x={centerX - wallThickness / 2}
                y={centerY - width}
                width={wallThickness}
                height={width}
                fill="#f5f5f5"
                stroke="#333"
                strokeWidth="0.75"
            />

            {/* Door swing arc (only shown when door is open) */}
            {isOpen && doorType === 'hinged' && (
                <path
                    d={getDoorSwingPath()}
                    fill="none"
                    stroke="#999"
                    strokeWidth="1"
                    strokeDasharray="3,3"
                    opacity="0.6"
                />
            )}

            {/* Selection indicator */}
            {isSelected && (
                <rect
                    x={centerX - wallThickness / 2 - 2}
                    y={centerY - width - 2}
                    width={wallThickness + 4}
                    height={width + 4}
                    fill="none"
                    stroke={selectionColor}
                    strokeWidth="2"
                    strokeDasharray="4,2"
                    style={{ pointerEvents: 'none' }}
                />
            )}

            {/* Door panel - different based on type and open/closed state */}
            {doorType === 'hinged' && (
                <>
                    {/* Door in closed position */}
                    {!isOpen && (
                        <rect
                            x={centerX - wallThickness / 2}
                            y={centerY - width}
                            width={wallThickness}
                            height={width}
                            fill={`url(#door-pattern-${id})`}
                            stroke={doorBorder}
                            strokeWidth="1"
                            filter={`url(#door-shadow-${id})`}
                        />
                    )}

                    {/* Door in open position */}
                    {isOpen && (
                        <rect
                            x={centerX}
                            y={centerY - wallThickness / 2}
                            width={-width}
                            height={wallThickness}
                            fill={`url(#door-pattern-${id})`}
                            stroke={doorBorder}
                            strokeWidth="1"
                            transform={`rotate(${-openAngle}, ${centerX}, ${centerY})`}
                            filter={`url(#door-shadow-${id})`}
                        />
                    )}

                    {/* Door handle */}
                    <circle
                        cx={centerX + (wallThickness / 2) - 4}
                        cy={centerY - width + 30}
                        r={3}
                        fill={handleColor}
                        stroke="#555"
                        strokeWidth="0.5"
                        style={{ pointerEvents: 'none' }}
                    />
                </>
            )}

            {/* Sliding door */}
            {doorType === 'sliding' && (
                <>
                    {/* Track */}
                    <line
                        x1={centerX - wallThickness / 2}
                        y1={centerY - width - 4}
                        x2={centerX + wallThickness / 2}
                        y2={centerY - width - 4}
                        stroke="#555"
                        strokeWidth="2"
                    />

                    {/* Door panel */}
                    <rect
                        x={centerX - wallThickness / 2 + (isOpen ? width * (openPercentage / 100) - width : 0)}
                        y={centerY - width}
                        width={wallThickness}
                        height={width}
                        fill={`url(#door-pattern-${id})`}
                        stroke={doorBorder}
                        strokeWidth="1"
                        filter={`url(#door-shadow-${id})`}
                    />

                    {/* Door handle */}
                    <rect
                        x={centerX - wallThickness / 2 + (isOpen ? width * (openPercentage / 100) - width : 0) + wallThickness - 4}
                        y={centerY - width + 40}
                        width={3}
                        height={15}
                        fill={handleColor}
                        stroke="#555"
                        strokeWidth="0.5"
                        rx="1"
                        ry="1"
                    />
                </>
            )}

            {/* Double door */}
            {doorType === 'double' && (
                <>
                    {/* Left door */}
                    <rect
                        x={centerX - wallThickness / 2}
                        y={centerY - width}
                        width={wallThickness / 2}
                        height={width}
                        fill={`url(#door-pattern-${id})`}
                        stroke={doorBorder}
                        strokeWidth="1"
                        transform={isOpen ? `rotate(${openAngle}, ${centerX - wallThickness / 2}, ${centerY})` : ''}
                        filter={`url(#door-shadow-${id})`}
                    />

                    {/* Right door */}
                    <rect
                        x={centerX}
                        y={centerY - width}
                        width={wallThickness / 2}
                        height={width}
                        fill={`url(#door-pattern-${id})`}
                        stroke={doorBorder}
                        strokeWidth="1"
                        transform={isOpen ? `rotate(${-openAngle}, ${centerX + wallThickness / 2}, ${centerY})` : ''}
                        filter={`url(#door-shadow-${id})`}
                    />

                    {/* Door handles */}
                    <circle
                        cx={centerX - 2}
                        cy={centerY - width + 40}
                        r={2}
                        fill={handleColor}
                        stroke="#555"
                        strokeWidth="0.5"
                    />
                    <circle
                        cx={centerX + 2}
                        cy={centerY - width + 40}
                        r={2}
                        fill={handleColor}
                        stroke="#555"
                        strokeWidth="0.5"
                    />
                </>
            )}

            {/* Door label */}
            <text
                x={centerX}
                y={centerY - width / 2}
                textAnchor="middle"
                fontSize="10"
                fill="#333"
                fontWeight="bold"
                style={{ pointerEvents: 'none' }}
            >
                {id}
            </text>
        </g>
    );
};

Door.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    wallThickness: PropTypes.number,
    rotation: PropTypes.number,
    isOpen: PropTypes.bool,
    openPercentage: PropTypes.number,
    doorType: PropTypes.oneOf(['hinged', 'sliding', 'double']),
    isSelected: PropTypes.bool,
    color: PropTypes.string,
    onClick: PropTypes.func,
    id: PropTypes.string.isRequired
};

export default Door;