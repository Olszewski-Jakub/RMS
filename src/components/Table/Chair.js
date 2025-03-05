// Chair.js
import React from 'react';
import PropTypes from 'prop-types';

const Chair = ({ cx, cy, color = '#b5651d' }) => (
  <circle cx={cx} cy={cy} r="10" fill={color} />
);
Chair.propTypes = {
  cx: PropTypes.number.isRequired,
  cy: PropTypes.number.isRequired,
  color: PropTypes.string,
};

export default Chair;