import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DateTimeForm.css"; // Import our custom styles

const DateTimeForm = ({
                        date,
                        setDate,
                        startTime,
                        setStartTime,
                        endTime,
                        setEndTime,
                        number,
                        setNumber,
                        onSearch,
                        loading
                      }) => {
  // Generate hours options (1-12)
  const hoursOptions = Array.from({ length: 12 }, (_, i) => ({
    value: String(i + 1).padStart(2, "0"),
    label: String(i + 1).padStart(2, "0")
  }));

  // Generate minutes options (00, 15, 30, 45)
  const minutesOptions = ["00", "15", "30", "45"].map(value => ({
    value,
    label: value
  }));

  // Handle hour change for start time
  const handleStartHourChange = (e) => {
    setStartTime({ ...startTime, hour: e.target.value });
  };

  // Handle minute change for start time
  const handleStartMinuteChange = (e) => {
    setStartTime({ ...startTime, minute: e.target.value });
  };

  // Handle AM/PM change for start time
  const handleStartAmPmChange = (e) => {
    setStartTime({ ...startTime, ampm: e.target.value });
  };

  // Handle hour change for end time
  const handleEndHourChange = (e) => {
    setEndTime({ ...endTime, hour: e.target.value });
  };

  // Handle minute change for end time
  const handleEndMinuteChange = (e) => {
    setEndTime({ ...endTime, minute: e.target.value });
  };

  // Handle AM/PM change for end time
  const handleEndAmPmChange = (e) => {
    setEndTime({ ...endTime, ampm: e.target.value });
  };

  // Filter to disable past dates
  const filterPastDates = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
  };

  return (
      <div className="reservation-form">
        <h3>Make a Reservation</h3>

        <div className="form-group">
          <label htmlFor="date">Date</label>
          <DatePicker
              id="date"
              selected={date}
              onChange={date => setDate(date)}
              dateFormat="MM/dd/yyyy"
              minDate={new Date()}
              filterDate={filterPastDates}
              placeholderText="Select a date"
              className="input-field"
          />
        </div>

        <div className="form-group">
          <label htmlFor="startTime">Start Time</label>
          <div className="time-select-container">
            <select
                id="startHour"
                value={startTime.hour}
                onChange={handleStartHourChange}
                className="select-field"
            >
              {hoursOptions.map(option => (
                  <option key={`start-hour-${option.value}`} value={option.value}>
                    {option.label}
                  </option>
              ))}
            </select>
            <select
                id="startMinute"
                value={startTime.minute}
                onChange={handleStartMinuteChange}
                className="select-field"
            >
              {minutesOptions.map(option => (
                  <option key={`start-minute-${option.value}`} value={option.value}>
                    {option.label}
                  </option>
              ))}
            </select>
            <select
                id="startAmPm"
                value={startTime.ampm}
                onChange={handleStartAmPmChange}
                className="select-field"
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="endTime">End Time</label>
          <div className="time-select-container">
            <select
                id="endHour"
                value={endTime.hour}
                onChange={handleEndHourChange}
                className="select-field"
            >
              {hoursOptions.map(option => (
                  <option key={`end-hour-${option.value}`} value={option.value}>
                    {option.label}
                  </option>
              ))}
            </select>
            <select
                id="endMinute"
                value={endTime.minute}
                onChange={handleEndMinuteChange}
                className="select-field"
            >
              {minutesOptions.map(option => (
                  <option key={`end-minute-${option.value}`} value={option.value}>
                    {option.label}
                  </option>
              ))}
            </select>
            <select
                id="endAmPm"
                value={endTime.ampm}
                onChange={handleEndAmPmChange}
                className="select-field"
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="number">Number of People</label>
          <input
              id="number"
              type="number"
              min="1"
              value={number}
              onChange={e => setNumber(e.target.value)}
              placeholder="Enter number of guests"
              className="input-field"
          />
        </div>

        <button
            className="search-button"
            onClick={onSearch}
            disabled={loading}
        >
          {loading ? "Searching..." : "Find Available Tables"}
        </button>

        <div className="helper-text">
          Select a date and time to check table availability, then click on an available table to make your reservation.
        </div>
      </div>
  );
};

export default DateTimeForm;