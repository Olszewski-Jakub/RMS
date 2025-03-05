import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  FormContainer,
  FormGroup,
  StyledSelect,
  StyledInput,
  TimeSelectContainer,
  SearchButton
} from "./ReserveTableStyle";

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

  // Custom styles for DatePicker
  const datePickerCustomStyles = {
    width: "100%",
    padding: "0.75rem",
    border: "2px solid rgba(255, 255, 255, 0.3)",
    borderRadius: "6px",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    fontSize: "1rem",
    transition: "all 0.2s ease",
  };

  // Filter to disable past dates
  const filterPastDates = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
  };

  return (
    <FormContainer>
      <h3>Make a Reservation</h3>

      <FormGroup>
        <label htmlFor="date">Date:</label>
        <DatePicker
          id="date"
          selected={date}
          onChange={date => setDate(date)}
          dateFormat="MM/dd/yyyy"
          minDate={new Date()}
          filterDate={filterPastDates}
          placeholderText="Select a date"
          style={datePickerCustomStyles}
          customInput={<StyledInput />}
        />
      </FormGroup>

      <FormGroup>
        <label htmlFor="startTime">Start Time:</label>
        <TimeSelectContainer>
          <StyledSelect
            id="startHour"
            value={startTime.hour}
            onChange={handleStartHourChange}
          >
            {hoursOptions.map(option => (
              <option key={`start-hour-${option.value}`} value={option.value}>
                {option.label}
              </option>
            ))}
          </StyledSelect>
          <StyledSelect
            id="startMinute"
            value={startTime.minute}
            onChange={handleStartMinuteChange}
          >
            {minutesOptions.map(option => (
              <option key={`start-minute-${option.value}`} value={option.value}>
                {option.label}
              </option>
            ))}
          </StyledSelect>
          <StyledSelect
            id="startAmPm"
            value={startTime.ampm}
            onChange={handleStartAmPmChange}
          >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </StyledSelect>
        </TimeSelectContainer>
      </FormGroup>

      <FormGroup>
        <label htmlFor="endTime">End Time:</label>
        <TimeSelectContainer>
          <StyledSelect
            id="endHour"
            value={endTime.hour}
            onChange={handleEndHourChange}
          >
            {hoursOptions.map(option => (
              <option key={`end-hour-${option.value}`} value={option.value}>
                {option.label}
              </option>
            ))}
          </StyledSelect>
          <StyledSelect
            id="endMinute"
            value={endTime.minute}
            onChange={handleEndMinuteChange}
          >
            {minutesOptions.map(option => (
              <option key={`end-minute-${option.value}`} value={option.value}>
                {option.label}
              </option>
            ))}
          </StyledSelect>
          <StyledSelect
            id="endAmPm"
            value={endTime.ampm}
            onChange={handleEndAmPmChange}
          >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </StyledSelect>
        </TimeSelectContainer>
      </FormGroup>

      <FormGroup>
        <label htmlFor="number">Number of People:</label>
        <StyledInput
          id="number"
          type="number"
          min="1"
          value={number}
          onChange={e => setNumber(e.target.value)}
          placeholder="Enter number of guests"
        />
      </FormGroup>

      <SearchButton 
        onClick={onSearch} 
        disabled={loading}
      >
        {loading ? "Searching..." : "Find Available Tables"}
      </SearchButton>
      
      <div style={{ marginTop: "1.5rem", fontSize: "0.9rem", opacity: "0.9", textAlign: "center" }}>
        Select a date and time to check table availability, then click on an available table to make your reservation.
      </div>
    </FormContainer>
  );
};

export default DateTimeForm;