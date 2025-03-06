import React from "react";
import PropTypes from "prop-types";
import Chair from "./Chair";

const TableWithChairs = ({
                             id,
                             x,
                             y,
                             tableType,
                             isAvailable,
                             onClick,
                             rotation = 0,
                             isMobile = false,
                             isDragging = false,
                             isSelected = false
                         }) => {
    const { width, height, chairsTop, chairsBottom, chairsLeft, chairsRight, isRound } = tableType;
    const tableCenter = { x: x + width / 2, y: y + height / 2 };

    const handleClick = (e) => {
        if (isAvailable && onClick) {
            e.stopPropagation();
            onClick(id, chairsTop + chairsBottom + chairsLeft + chairsRight);
        }
    };

    // Get positions for chairs around a round table
    const getRoundTableChairPositions = () => {
        const positions = [];
        const totalChairs = chairsTop + chairsBottom + chairsLeft + chairsRight;

        if (totalChairs > 0) {
            const radius = Math.max(width, height) / 2 + 25; // Increased padding for realistic spacing
            const centerX = x + width / 2;
            const centerY = y + height / 2;

            for (let i = 0; i < totalChairs; i++) {
                const angle = (Math.PI * (i / totalChairs) * 2) - Math.PI / 2;
                positions.push({
                    cx: centerX + Math.cos(angle) * radius,
                    cy: centerY + Math.sin(angle) * radius,
                    rotation: (angle * 180 / Math.PI) + 90 // Chair rotation to face the table
                });
            }
        }
        return positions;
    };

    // Get chair positions for rectangular tables with proper orientation
    const getRectangularChairPositions = () => {
        const positions = [];

        // Top chairs
        for (let i = 0; i < chairsTop; i++) {
            const chairSpacing = width / (chairsTop + 1);
            positions.push({
                position: 'top',
                cx: x + chairSpacing * (i + 1),
                cy: y - 20,
                rotation: 180 // Facing down toward the table
            });
        }

        // Bottom chairs
        for (let i = 0; i < chairsBottom; i++) {
            const chairSpacing = width / (chairsBottom + 1);
            positions.push({
                position: 'bottom',
                cx: x + chairSpacing * (i + 1),
                cy: y + height + 20,
                rotation: 0 // Facing up toward the table
            });
        }

        // Left chairs
        for (let i = 0; i < chairsLeft; i++) {
            const chairSpacing = height / (chairsLeft + 1);
            positions.push({
                position: 'left',
                cx: x - 20,
                cy: y + chairSpacing * (i + 1),
                rotation: 90 // Facing right toward the table
            });
        }

        // Right chairs
        for (let i = 0; i < chairsRight; i++) {
            const chairSpacing = height / (chairsRight + 1);
            positions.push({
                position: 'right',
                cx: x + width + 20,
                cy: y + chairSpacing * (i + 1),
                rotation: 270 // Facing left toward the table
            });
        }

        return positions;
    };

    // Styling constants with improved colors
    const activeTableColor = isRound ? "#a9be98" : "#8cb369";
    const inactiveTableColor = "#798797";
    const activeChairColor = "#cd8a47";
    const inactiveChairColor = "#939393";
    const selectionColor = "#ff6b6b";

    // Define patterns for wood texture
    const patternId = `wood-pattern-${id}`;
    const tablePatternId = `table-pattern-${id}`;

    // Chair positions
    const chairPositions = isRound ? getRoundTableChairPositions() : getRectangularChairPositions();

    return (
        <g
            onClick={handleClick}
            className={`table-with-chairs ${isSelected ? 'selected' : ''}`}
            data-id={id}
            style={{
                transition: isDragging ? 'none' : 'all 0.2s ease'
            }}
        >
            {}
            <defs>
                {}
                <filter id={`shadow-${id}`} x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="3" stdDeviation={isDragging ? 6 : 3} floodOpacity="0.25" />
                </filter>

                {}
                <filter id={`selection-glow-${id}`} x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feFlood floodColor={selectionColor} floodOpacity="0.7" result="color" />
                    <feComposite in="color" in2="blur" operator="in" result="glow" />
                    <feMerge>
                        <feMergeNode in="glow" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>

                {}
                <pattern id={patternId} patternUnits="userSpaceOnUse" width="20" height="20" patternTransform="rotate(45)">
                    <rect width="20" height="20" fill={isAvailable ? activeChairColor : inactiveChairColor} />
                    <rect width="1" height="20" fill="rgba(0,0,0,0.1)" x="0" y="0" />
                    <rect width="1" height="20" fill="rgba(255,255,255,0.05)" x="10" y="0" />
                </pattern>

                {}
                <pattern id={tablePatternId} patternUnits="userSpaceOnUse" width="40" height="40" patternTransform="rotate(20)">
                    <rect width="40" height="40" fill={isAvailable ? activeTableColor : inactiveTableColor} />
                    <line x1="0" y1="0" x2="40" y2="40" stroke="rgba(0,0,0,0.05)" strokeWidth="1" />
                    <line x1="40" y1="0" x2="0" y2="40" stroke="rgba(0,0,0,0.05)" strokeWidth="1" />
                </pattern>
            </defs>

            {}
            <g transform={`rotate(${rotation}, ${tableCenter.x}, ${tableCenter.y})`}>
                {}
                {isSelected && !isRound && (
                    <rect
                        x={x - 8}
                        y={y - 8}
                        width={width + 16}
                        height={height + 16}
                        rx={8}
                        ry={8}
                        fill="none"
                        stroke={selectionColor}
                        strokeWidth={3}
                        strokeDasharray="5,3"
                        opacity={0.8}
                    />
                )}

                {isSelected && isRound && (
                    <circle
                        cx={tableCenter.x}
                        cy={tableCenter.y}
                        r={(width / 2) + 8}
                        fill="none"
                        stroke={selectionColor}
                        strokeWidth={3}
                        strokeDasharray="5,3"
                        opacity={0.8}
                    />
                )}

                {}
                {isRound ? (
                    <>
                        {}
                        <ellipse
                            cx={tableCenter.x}
                            cy={tableCenter.y + 2}
                            rx={width / 2}
                            ry={width / 2 * 0.98}
                            fill="rgba(0,0,0,0.15)"
                            opacity="0.5"
                        />

                        {}
                        <circle
                            cx={tableCenter.x}
                            cy={tableCenter.y + (height / 4)}
                            r={width / 6}
                            fill={isAvailable ? "#70401b" : "#5a5a5a"}
                            opacity="0.8"
                        />

                        {}
                        <circle
                            cx={tableCenter.x}
                            cy={tableCenter.y}
                            r={width / 2}
                            fill={`url(#${tablePatternId})`}
                            stroke={isAvailable ? "#70401b" : "#5a5a5a"}
                            strokeWidth={2}
                            filter={isDragging ? 'none' : `url(#shadow-${id})`}
                            style={{
                                cursor: isAvailable ? 'pointer' : 'not-allowed',
                                transition: isDragging ? 'none' : 'all 0.2s ease'
                            }}
                        />

                        {}
                        <circle
                            cx={tableCenter.x}
                            cy={tableCenter.y}
                            r={width / 2}
                            fill="none"
                            stroke={isSelected ? selectionColor : (isAvailable ? "#5e3816" : "#4a4a4a")}
                            strokeWidth={isSelected ? 2 : 4}
                            strokeOpacity="0.7"
                        />
                    </>
                ) : (
                    <>
                        {}
                        <rect
                            x={x + 3}
                            y={y + 3}
                            width={width - 6}
                            height={height - 6}
                            rx={4}
                            ry={4}
                            fill="rgba(0,0,0,0.15)"
                            opacity="0.5"
                        />

                        {}
                        <rect x={x + 10} y={y + 10} width={8} height={height - 20} fill={isAvailable ? "#5e3816" : "#5a5a5a"} />
                        <rect x={x + width - 18} y={y + 10} width={8} height={height - 20} fill={isAvailable ? "#5e3816" : "#5a5a5a"} />

                        {}
                        <rect
                            x={x}
                            y={y}
                            width={width}
                            height={height}
                            rx={4}
                            ry={4}
                            fill={`url(#${tablePatternId})`}
                            stroke={isAvailable ? "#5e3816" : "#4a4a4a"}
                            strokeWidth={2}
                            filter={isDragging ? 'none' : `url(#shadow-${id})`}
                            style={{
                                cursor: isAvailable ? 'pointer' : 'not-allowed',
                                transition: isDragging ? 'none' : 'all 0.2s ease'
                            }}
                        />

                        {}
                        <rect
                            x={x + 2}
                            y={y + 2}
                            width={width - 4}
                            height={height - 4}
                            rx={3}
                            ry={3}
                            fill="none"
                            stroke="rgba(255,255,255,0.1)"
                            strokeWidth={1}
                        />
                    </>
                )}

                {}
                {chairPositions.map((chair, idx) => (
                    <Chair
                        key={`chair-${idx}`}
                        cx={chair.cx}
                        cy={chair.cy}
                        rotation={chair.rotation}
                        color={isAvailable ? activeChairColor : inactiveChairColor}
                    />
                ))}
            </g>

            {}
            <g>
                <text
                    x={tableCenter.x}
                    y={tableCenter.y + 1}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="rgba(0,0,0,0.5)"
                    fontWeight="bold"
                    fontSize={isMobile ? "1rem" : "1.2rem"}
                    pointerEvents="none"
                >
                    {id}
                </text>
                <text
                    x={tableCenter.x}
                    y={tableCenter.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#fff"
                    fontWeight="bold"
                    fontSize={isMobile ? "1rem" : "1.2rem"}
                    pointerEvents="none"
                >
                    {id}
                </text>
            </g>
        </g>
    );
};

TableWithChairs.propTypes = {
    id: PropTypes.string.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    isAvailable: PropTypes.bool,
    tableType: PropTypes.shape({
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        chairsTop: PropTypes.number.isRequired,
        chairsBottom: PropTypes.number.isRequired,
        chairsLeft: PropTypes.number.isRequired,
        chairsRight: PropTypes.number.isRequired,
        isRound: PropTypes.bool
    }).isRequired,
    onClick: PropTypes.func,
    rotation: PropTypes.number,
    isMobile: PropTypes.bool,
    isDragging: PropTypes.bool,
    isSelected: PropTypes.bool
};

TableWithChairs.defaultProps = {
    isAvailable: true,
    rotation: 0,
    onClick: () => {},
    isMobile: false,
    isDragging: false,
    isSelected: false
};

export default TableWithChairs;