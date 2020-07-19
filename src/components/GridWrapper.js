import React, { useState, useEffect } from "react";
import Grid from "./Grid";
import GridToolbar from "./GridToolbar";
import { GRID_STATUS } from "../constants/gridStatus";
import { CELL_STATUS } from "../constants/cellStatus";

const isAWall = (row, col, wallCoords) => {
  for (let i = 0; i < wallCoords.length; i++) {
    const [wallRowIndex, wallColIndex] = wallCoords[i];
    if (row === wallRowIndex && col === wallColIndex) {
      return true;
    }
  }
  return false;
};

const generateCells = (
  numOfRows,
  numOfCols,
  startCellCoords,
  endCellCoords,
  wallCoords
) => {
  const cells = [];
  for (let row = 0; row < numOfRows; row++) {
    const currentRow = [];
    for (let col = 0; col < numOfCols; col++) {
      const [startRowIndex, startColIndex] = startCellCoords;
      const [endRowIndex, endColIndex] = endCellCoords;

      if (row === startRowIndex && col === startColIndex) {
        currentRow.push(CELL_STATUS.START);
      } else if (row === endRowIndex && col === endColIndex) {
        currentRow.push(CELL_STATUS.END);
      } else if (isAWall(row, col, wallCoords)) {
        currentRow.push(CELL_STATUS.WALL);
      } else {
        currentRow.push(CELL_STATUS.UNVISITED);
      }
    }
    cells.push(currentRow);
  }
  return cells;
};

const GridWrapper = ({ numOfRows, numOfCols }) => {
  const [gridStatus, setGridStatus] = useState(GRID_STATUS.DEFAULT);
  const [gridCells, setGridCells] = useState([]);
  const [startCellCoords, setStartCellCoords] = useState([
    Math.floor(numOfRows / 2),
    Math.floor(numOfCols / 6),
  ]);
  const [endCellCoords, setEndCellCoords] = useState([
    Math.floor(numOfRows / 2),
    numOfCols - Math.round(numOfCols / 6),
  ]);
  const [wallCoords, setWallCoords] = useState([]);

  useEffect(() => {
    const cells = generateCells(
      numOfRows,
      numOfCols,
      startCellCoords,
      endCellCoords,
      wallCoords
    );
    setGridCells(cells);
  }, [startCellCoords, endCellCoords, wallCoords]);

  const handleOnCellClick = (cellStatus, cellRowIndex, cellColIndex) => {
    switch (gridStatus) {
      case GRID_STATUS.SET_START:
        if (cellStatus === CELL_STATUS.UNVISITED) {
          setStartCellCoords([cellRowIndex, cellColIndex]);
        }
        break;
      case GRID_STATUS.SET_END:
        if (cellStatus === CELL_STATUS.UNVISITED) {
          setEndCellCoords([cellRowIndex, cellColIndex]);
        }
        break;
      case GRID_STATUS.SET_WALL:
        if (cellStatus === CELL_STATUS.WALL) {
          const newWallCoords = wallCoords.filter((wallCoord) => {
            const [wallRowIndex, wallColIndex] = wallCoord;
            return (
              wallRowIndex !== cellRowIndex || wallColIndex !== cellColIndex
            );
          });
          setWallCoords(newWallCoords);
        } else if (cellStatus === CELL_STATUS.UNVISITED) {
          setWallCoords([...wallCoords, [cellRowIndex, cellColIndex]]);
        }
        break;
      default:
        break;
    }
  };

  const handleGridStatusChange = (_, status) => {
    setGridStatus(status);
    if (status === GRID_STATUS.CLEAR_GRID) {
      clearGrid();
      setGridStatus(GRID_STATUS.DEFAULT);
    }
  };

  const clearGrid = () => {
    setStartCellCoords([]);
    setEndCellCoords([]);
    setWallCoords([]);
  };

  return (
    <div>
      <GridToolbar
        gridStatus={gridStatus}
        onGridStatusChange={handleGridStatusChange}
      />
      <Grid gridCells={gridCells} handleOnCellClick={handleOnCellClick} />
    </div>
  );
};

export default GridWrapper;
