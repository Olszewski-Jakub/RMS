import React, { useState } from "react";
import { ReserveTableContainer } from "./ReserveTableStyle";
import FloorPlan from "../../components/Table/FloorPlan";
import DateTimeForm from "./DateTimeForm";

const ReserveTable = () => {
  return (
    <div id="reserve">
      <ReserveTableContainer>
        <FloorPlan />
      </ReserveTableContainer>
    </div>
  );
};

export default ReserveTable;