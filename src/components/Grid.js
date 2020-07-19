import React, { useState, useEffect } from "react";
import Cell from "./Cell";
import "../assets/stylesheets/Grid.scss";

const generateCells = (numOfRows, numOfCols) => {
  const cells = [];
  for (let row = 0; row < numOfRows; row++) {
    const currentRow = [];
    for (let col = 0; col < numOfCols; col++) {
      currentRow.push([]);
    }
    cells.push(currentRow);
  }
  return cells;
};

const Grid = ({ numOfRows, numOfCols }) => {
  const [gridCells, setGridCells] = useState([]);

  useEffect(() => {
    const cells = generateCells(numOfRows, numOfCols);
    setGridCells(cells);
  }, []);

  return (
    <div className="grid">
      {gridCells.map((row, rowIndex) => (
        <div key={rowIndex} className="grid-row">
          {row.map((_, colIndex) => (
            <Cell key={`${(rowIndex, colIndex)}`} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;