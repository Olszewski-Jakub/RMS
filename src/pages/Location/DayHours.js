import React from 'react';
import PropTypes from 'prop-types';

const DayHours = ({ day, hours }) => {
  return (
    <div className="day-hours">
      <span className="day">{day}:</span>
      <span className="hours">{hours}</span>
    </div>
  );
};
DayHours.propTypes = {
  day: PropTypes.string.isRequired,
  hours: PropTypes.string.isRequired,
};

export default DayHours;