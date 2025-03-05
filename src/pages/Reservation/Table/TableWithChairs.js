// TableWithChairs.js
import React from "react";
import PropTypes from "prop-types";
import Chair from "./Chair";

const TableWithChairs = ({ id, x, y, tableType, isAvaible, onClick, isSelected }) => {
  const { width, height, chairsTop, chairsBottom, chairsLeft, chairsRight } = tableType;
  const chairSpacing = 30; 

  const handleClick = () => {
    onClick(id);
  };

  // Define table color based on selection
  const tableColor = isSelected ? "#FFD700" : isAvaible ? "#8B4513" : "#36454F"; // Yellow if selected, brown if available

  return (
    <g onClick={isAvaible ? handleClick : () => {}} style={{ cursor: "pointer" }}>
      {/* Table */}
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={tableColor} 
        stroke="black"
        strokeWidth="2"
      />

      {/* Chairs */}
      {Array.from({ length: chairsTop }, (_, i) => (
        <Chair key={`top-${i}`} cx={x + 15 + i * chairSpacing} cy={y - 20} />
      ))}
      {Array.from({ length: chairsBottom }, (_, i) => (
        <Chair key={`bottom-${i}`} cx={x + 15 + i * chairSpacing} cy={y + height + 20} />
      ))}
      {Array.from({ length: chairsLeft }, (_, i) => (
        <Chair key={`left-${i}`} cx={x - 20} cy={y + 15 + i * chairSpacing} />
      ))}
      {Array.from({ length: chairsRight }, (_, i) => (
        <Chair key={`right-${i}`} cx={x + width + 20} cy={y + 15 + i * chairSpacing} />
      ))}
    </g>
  );
};

TableWithChairs.propTypes = {
  id: PropTypes.number.isRequired,
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
  onClick: PropTypes.func.isRequired,
  isSelected: PropTypes.bool,
};

export default TableWithChairs;
