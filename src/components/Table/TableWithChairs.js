import React from "react";
import PropTypes from "prop-types";
import Chair from "./Chair";

const TableWithChairs = ({ id, x, y, tableType, isAvaible, onClick, rotation = 0 }) => {
  const { width, height, chairsTop, chairsBottom, chairsLeft, chairsRight } = tableType;
  const tableCenter = { x: x + width / 2, y: y + height / 2 };

  const handleClick = () => {
    onClick(id, chairsTop + chairsBottom + chairsLeft + chairsRight);
  };

  // Calculate chair positions based on rotation
  let chairPositions;

  switch (rotation) {
    case 90:
      chairPositions = {
        top: Array.from({ length: chairsRight }, (_, i) => ({
          cx: x + tableType.height + 20,
          cy: y + 15 + i * 30
        })),
        bottom: Array.from({ length: chairsLeft }, (_, i) => ({
          cx: x - 20,
          cy: y + 15 + i * 30
        })),
        left: Array.from({ length: chairsBottom }, (_, i) => ({
          cx: x + 15 + i * 30,
          cy: y + tableType.width + 20
        })),
        right: Array.from({ length: chairsTop }, (_, i) => ({
          cx: x + 15 + i * 30,
          cy: y - 20
        }))
      };
      break;
    case 180:
      chairPositions = {
        top: Array.from({ length: chairsBottom }, (_, i) => ({
          cx: x + 15 + i * 30,
          cy: y + height + 20
        })),
        bottom: Array.from({ length: chairsTop }, (_, i) => ({
          cx: x + 15 + i * 30,
          cy: y - 20
        })),
        left: Array.from({ length: chairsRight }, (_, i) => ({
          cx: x + width + 20,
          cy: y + 15 + i * 30
        })),
        right: Array.from({ length: chairsLeft }, (_, i) => ({
          cx: x - 20,
          cy: y + 15 + i * 30
        }))
      };
      break;
    case 270:
      chairPositions = {
        top: Array.from({ length: chairsLeft }, (_, i) => ({
          cx: x - 20,
          cy: y + 15 + i * 30
        })),
        bottom: Array.from({ length: chairsRight }, (_, i) => ({
          cx: x + width + 20,
          cy: y + 15 + i * 30
        })),
        left: Array.from({ length: chairsTop }, (_, i) => ({
          cx: x + 15 + i * 30,
          cy: y - 20
        })),
        right: Array.from({ length: chairsBottom }, (_, i) => ({
          cx: x + 15 + i * 30,
          cy: y + height + 20
        }))
      };
      break;
    default: // 0 degrees
      chairPositions = {
        top: Array.from({ length: chairsTop }, (_, i) => ({
          cx: x + 15 + i * 30,
          cy: y - 20
        })),
        bottom: Array.from({ length: chairsBottom }, (_, i) => ({
          cx: x + 15 + i * 30,
          cy: y + height + 20
        })),
        left: Array.from({ length: chairsLeft }, (_, i) => ({
          cx: x - 20,
          cy: y + 15 + i * 30
        })),
        right: Array.from({ length: chairsRight }, (_, i) => ({
          cx: x + width + 20,
          cy: y + 15 + i * 30
        }))
      };
  }

  return (
      <g onClick={isAvaible ? handleClick : () => {}}>
        {/* Table with rotation */}
        <rect
            x={x}
            y={y}
            width={width}
            height={height}
            fill={isAvaible ? "#8B4513" : "#36454F"}
            stroke="black"
            strokeWidth="1"
            transform={`rotate(${rotation}, ${tableCenter.x}, ${tableCenter.y})`}
        />

        {/* Table number */}
        <text
            x={tableCenter.x}
            y={tableCenter.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#fff"
            fontWeight="bold"
            pointerEvents="none"
        >
          {id}
        </text>

        {/* Chairs */}
        {chairPositions.top.map((pos, idx) => (
            <Chair
                key={`top-${idx}`}
                cx={pos.cx}
                cy={pos.cy}
                color={isAvaible ? "#b5651d" : "#808080"}
            />
        ))}
        {chairPositions.bottom.map((pos, idx) => (
            <Chair
                key={`bottom-${idx}`}
                cx={pos.cx}
                cy={pos.cy}
                color={isAvaible ? "#b5651d" : "#808080"}
            />
        ))}
        {chairPositions.left.map((pos, idx) => (
            <Chair
                key={`left-${idx}`}
                cx={pos.cx}
                cy={pos.cy}
                color={isAvaible ? "#b5651d" : "#808080"}
            />
        ))}
        {chairPositions.right.map((pos, idx) => (
            <Chair
                key={`right-${idx}`}
                cx={pos.cx}
                cy={pos.cy}
                color={isAvaible ? "#b5651d" : "#808080"}
            />
        ))}
      </g>
  );
};

TableWithChairs.propTypes = {
  id: PropTypes.string.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  isAvaible: PropTypes.bool,
  tableType: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    chairsTop: PropTypes.number.isRequired,
    chairsBottom: PropTypes.number.isRequired,
    chairsLeft: PropTypes.number.isRequired,
    chairsRight: PropTypes.number.isRequired,
  }).isRequired,
  onClick: PropTypes.func,
  rotation: PropTypes.number
};

TableWithChairs.defaultProps = {
  isAvaible: true,
  rotation: 0,
  onClick: () => {}
};

export default TableWithChairs;