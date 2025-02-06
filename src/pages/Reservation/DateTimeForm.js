import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DateTimeForm.css';

const DateTimeForm = ({ date, setDate, startTime, setStartTime, endTime, setEndTime, number, setNumber, onSearch }) => {
  const [isValid, setIsValid] = useState(false);

  const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => (i).toString().padStart(2, '0'));
  const ampm = ['AM', 'PM'];

  const validateForm = () => {
    const startTimeDate = new Date(`1970-01-01T${startTime.hour}:${startTime.minute} ${startTime.ampm}`);
    const endTimeDate = new Date(`1970-01-01T${endTime.hour}:${endTime.minute} ${endTime.ampm}`);
    setIsValid(
      date &&
      startTime &&
      endTime &&
      startTimeDate <= endTimeDate &&
      number > 0
    );
  };

  const handleSearch = () => {
    console.log({
      date: date ? date.toLocaleDateString() : null,
      startTime: `${startTime.hour}:${startTime.minute} ${startTime.ampm}`,
      endTime: `${endTime.hour}:${endTime.minute} ${endTime.ampm}`,
      number,
    });
  };

  useEffect(() => {
    validateForm();
  }, [date, startTime, endTime, number]);

  return (
    <div className="form-container">
      <div className="form-item">
        <label>Date:</label>
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat="MM/dd/yyyy"
          className="datepicker"
         showMonthYearDropdown/>
      </div>

      <div className="form-item">
        <label>Start Time:</label>
        <select
          value={startTime.hour}
          onChange={(e) => setStartTime({ ...startTime, hour: e.target.value })}
        >
          {hours.map((hour) => (
            <option key={hour} value={hour}>{hour}</option>
          ))}
        </select>
        :
        <select
          value={startTime.minute}
          onChange={(e) => setStartTime({ ...startTime, minute: e.target.value })}
        >
          {minutes.map((minute) => (
            <option key={minute} value={minute}>{minute}</option>
          ))}
        </select>
        <select
          value={startTime.ampm}
          onChange={(e) => setStartTime({ ...startTime, ampm: e.target.value })}
        >
          {ampm.map((period) => (
            <option key={period} value={period}>{period}</option>
          ))}
        </select>
      </div>

      <div className="form-item">
        <label>End Time:</label>
        <select
          value={endTime.hour}
          onChange={(e) => setEndTime({ ...endTime, hour: e.target.value })}
        >
          {hours.map((hour) => (
            <option key={hour} value={hour}>{hour}</option>
          ))}
        </select>
        :
        <select
          value={endTime.minute}
          onChange={(e) => setEndTime({ ...endTime, minute: e.target.value })}
        >
          {minutes.map((minute) => (
            <option key={minute} value={minute}>{minute}</option>
          ))}
        </select>
        <select
          value={endTime.ampm}
          onChange={(e) => setEndTime({ ...endTime, ampm: e.target.value })}
        >
          {ampm.map((period) => (
            <option key={period} value={period}>{period}</option>
          ))}
        </select>
      </div>

      <div className="form-item">
        <label>Number:</label>
        <input
          type="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          min="0"
        />
      </div>

      <button
        onClick={onSearch}
        disabled={!isValid}
      >
        Search
      </button>
    </div>
  );
};

export default DateTimeForm;
