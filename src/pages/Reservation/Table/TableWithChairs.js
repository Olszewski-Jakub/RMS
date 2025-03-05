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