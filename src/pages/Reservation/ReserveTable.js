import React, { useState } from "react";
import { ReserveTableContainer } from "./ReserveTableStyle";
import FloorPlan from "./FloorPlan";

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