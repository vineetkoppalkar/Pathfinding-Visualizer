import React, { useState } from "react";
import Grid from "./Grid";
import GridToolbar from "./GridToolbar";
import { GRID_STATUS } from "../constants/gridStatus";

const GridWrapper = ({ numOfRows, numOfCols }) => {
  const [gridStatus, setGridStatus] = useState(GRID_STATUS.DEFAULT);

  const handleGridStatusChange = (_, status) => {
    setGridStatus(status);
  };

  return (
    <div>
      <GridToolbar
        gridStatus={gridStatus}
        onGridStatusChange={handleGridStatusChange}
      />
      <Grid
        gridStatus={gridStatus}
        numOfRows={numOfRows}
        numOfCols={numOfCols}
      />
    </div>
  );
};

export default GridWrapper;
