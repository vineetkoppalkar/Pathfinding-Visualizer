import React, { useState } from "react";
import Grid from "./Grid";

const PathfindingVisualizer = () => {
  const [numOfRows, setNumOfRows] = useState(15);
  const [numOfCols, setNumOfCols] = useState(35);

  return (
    <div>
      <Grid numOfRows={numOfRows} numOfCols={numOfCols} />
    </div>
  );
};

export default PathfindingVisualizer;
