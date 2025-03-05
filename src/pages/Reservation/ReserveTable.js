import React, { useState } from "react";
import { ReserveTableContainer } from "./ReserveTableStyle";
import FloorPlan from "../../components/Table/FloorPlan";
import DateTimeForm from "./DateTimeForm";

const ReserveTable = () => {
  const [date, setDate] = useState(null);
  const [startTime, setStartTime] = useState({ hour: '12', minute: '00', ampm: 'AM' });
  const [endTime, setEndTime] = useState({ hour: '12', minute: '30', ampm: 'AM' });
  const [number, setNumber] = useState('');
  return (
    <div id="reserve">
      <ReserveTableContainer>
        <FloorPlan />
        {/*<DateTimeForm*/}
        {/*date={date}*/}
        {/*setDate={setDate}*/}
        {/*startTime={startTime}*/}
        {/*setStartTime={setStartTime}*/}
        {/*endTime={endTime}*/}
        {/*setEndTime={setEndTime}*/}
        {/*number={number}*/}
        {/*setNumber={setNumber}*/}
        {/*onSearch={ }*/}
      />
      </ReserveTableContainer>
    </div>
  );
};

export default ReserveTable;