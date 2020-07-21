import React, { useState } from "react";
import GridWrapper from "./GridWrapper";
import algorithmA from "../algorithms/algorithmA";

const PathfindingVisualizer = () => {
  const [numOfRows, setNumOfRows] = useState(15);
  const [numOfCols, setNumOfCols] = useState(35);

  return (
    <div>
      <GridWrapper
        numOfRows={numOfRows}
        numOfCols={numOfCols}
        pathfindingAlgorithm={algorithmA}
      />
    </div>
  );
};

export default PathfindingVisualizer;
