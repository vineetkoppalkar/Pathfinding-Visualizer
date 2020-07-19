import React from "react";
import Cell from "./Cell";

import "../assets/stylesheets/Grid.scss";

const Grid = ({ gridCells, handleOnCellClick }) => {
  return (
    <div className="grid">
      {gridCells.map((row, rowIndex) => (
        <div key={rowIndex} className="grid-row">
          {row.map((cellStatus, colIndex) => (
            <Cell
              key={`${(rowIndex, colIndex)}`}
              status={cellStatus}
              rowIndex={rowIndex}
              colIndex={colIndex}
              handleOnCellClick={handleOnCellClick}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;
