import React, { useState } from "react";
import Grid from "./Grid";

const PathfindingVisualizer = () => {
  const [numOfRows, setNumOfRows] = useState(15);
  const [numOfCols, setNumOfCols] = useState(35);

  return (
    <div>
      <h1>Pathfinding Visualizer</h1>
      <Grid numOfRows={numOfRows} numOfCols={numOfCols} />
    </div>
  );
};

export default PathfindingVisualizer;
