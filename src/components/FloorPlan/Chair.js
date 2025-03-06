import React from 'react';
import PropTypes from 'prop-types';

const Chair = ({ cx, cy, color = '#b5651d', rotation = 0 }) => {
  // Chair dimensions
  const seatWidth = 16;
  const seatDepth = 16;
  const backHeight = 12;
  const legHeight = 6;

  // Calculate position for the chair components
  const seatX = cx - seatWidth / 2;
  const seatY = cy - seatDepth / 2;

  return (
      <g transform={`rotate(${rotation}, ${cx}, ${cy})`}>
        {/* Chair back */}
        <rect
            x={seatX}
            y={seatY - backHeight}
            width={seatWidth}
            height={backHeight}
            rx={2}
            ry={2}
            fill={color}
            stroke="#70401b"
            strokeWidth={0.5}
        />

        {/* Chair seat */}
        <rect
            x={seatX}
            y={seatY}
            width={seatWidth}
            height={seatDepth}
            rx={2}
            ry={2}
            fill={color}
            stroke="#70401b"
            strokeWidth={0.5}
        />

        {/* Chair legs */}
        <rect x={seatX + 2} y={seatY + seatDepth} width={2} height={legHeight} fill="#5e3816" />
        <rect x={seatX + seatWidth - 4} y={seatY + seatDepth} width={2} height={legHeight} fill="#5e3816" />

        {/* Chair shadow */}
        <ellipse
            cx={cx}
            cy={cy + legHeight + 1}
            rx={seatWidth / 2 - 1}
            ry={3}
            fill="rgba(0,0,0,0.15)"
            opacity={0.7}
        />
      </g>
  );
};

Chair.propTypes = {
  cx: PropTypes.number.isRequired,
  cy: PropTypes.number.isRequired,
  color: PropTypes.string,
  rotation: PropTypes.number
};

export default Chair;