// TableWithChairs.js
import React from "react";
import PropTypes from "prop-types";
import Chair from "./Chair";

const TableWithChairs = ({ id, x, y, tableType, isAvaible, onClick }) => {
    
  const { width, height, chairsTop, chairsBottom, chairsLeft, chairsRight } =
    tableType;
  const chairSpacing = 30; // Adjust spacing between chairs if needed
  const handleClick = () => {
    onClick(id, (chairsTop + chairsBottom + chairsLeft + chairsRight));
  };
  // Calculate chair positions
  const topChairs = Array.from({ length: chairsTop }, (_, i) => ({
    cx: x + 15 + i * chairSpacing,
    cy: y - 20,
  }));
  const bottomChairs = Array.from({ length: chairsBottom }, (_, i) => ({
    cx: x + 15 + i * chairSpacing,
    cy: y + height + 20,
  }));
  const leftChairs = Array.from({ length: chairsLeft }, (_, i) => ({
    cx: x - 20,
    cy: y + 15 + i * chairSpacing,
  }));
  const rightChairs = Array.from({ length: chairsRight }, (_, i) => ({
    cx: x + width + 20,
    cy: y + 15 + i * chairSpacing,
  }));

  return (
    <g onClick={isAvaible ? handleClick : () => {}}>
      {/* Table */}
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={isAvaible ? "#8B4513" : "#36454F"}
        stroke="black"
      />

      {/* Chairs */}
      {topChairs.map((pos, idx) => (
        <Chair key={`top-${idx}`} cx={pos.cx} cy={pos.cy} />
      ))}
      {bottomChairs.map((pos, idx) => (
        <Chair key={`bottom-${idx}`} cx={pos.cx} cy={pos.cy} />
      ))}
      {leftChairs.map((pos, idx) => (
        <Chair key={`left-${idx}`} cx={pos.cx} cy={pos.cy} />
      ))}
      {rightChairs.map((pos, idx) => (
        <Chair key={`right-${idx}`} cx={pos.cx} cy={pos.cy} />
      ))}
    </g>
  );
};
TableWithChairs.propTypes = {
  id: PropTypes.string.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  isAvaible: PropTypes.bool.isRequired,
  tableType: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    chairsTop: PropTypes.number.isRequired,
    chairsBottom: PropTypes.number.isRequired,
    chairsLeft: PropTypes.number.isRequired,
    chairsRight: PropTypes.number.isRequired,
  }).isRequired,
  onClick: PropTypes.func,
};

export default TableWithChairs;