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

const GridWrapper = ({ numOfRows, numOfCols, pathfindingAlgorithm }) => {
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
  const [isReadyToStart, setIsReadyToStart] = useState(true);

  useEffect(() => {
    const cells = generateCells(
      numOfRows,
      numOfCols,
      startCellCoords,
      endCellCoords,
      wallCoords
    );
    setGridCells(cells);
  }, []);

  useEffect(() => {
    if (startCellCoords.length === 0 || endCellCoords.length === 0) {
      setIsReadyToStart(false);
    } else {
      setIsReadyToStart(true);
    }
  }, [startCellCoords, endCellCoords]);

  const updateCellStatus = (cellRowIndex, cellColIndex, newCellStatus) => {
    setGridCells((prevGridCells) => {
      const newGridCells = JSON.parse(JSON.stringify(prevGridCells));
      newGridCells[cellRowIndex][cellColIndex] = newCellStatus;
      return newGridCells;
    });
  };

  const setNewStartCoords = (newStartRowIndex, newStartColIndex) => {
    if (startCellCoords.length !== 0) {
      const [prevStartRowIndex, prevStartColIndex] = startCellCoords;
      updateCellStatus(
        prevStartRowIndex,
        prevStartColIndex,
        CELL_STATUS.UNVISITED
      );
    }
    setStartCellCoords([newStartRowIndex, newStartColIndex]);
    updateCellStatus(newStartRowIndex, newStartColIndex, CELL_STATUS.START);
  };

  const setNewEndCoords = (newEndRowIndex, newEndColIndex) => {
    if (endCellCoords.length !== 0) {
      const [prevEndRowIndex, prevEndColIndex] = endCellCoords;
      updateCellStatus(prevEndRowIndex, prevEndColIndex, CELL_STATUS.UNVISITED);
    }

    setEndCellCoords([newEndRowIndex, newEndColIndex]);
    updateCellStatus(newEndRowIndex, newEndColIndex, CELL_STATUS.END);
  };

  const removeExisitingWall = (cellRowIndex, cellColIndex) => {
    updateCellStatus(cellRowIndex, cellColIndex, CELL_STATUS.UNVISITED);
    const newWallCoords = wallCoords.filter((wallCoord) => {
      const [wallRowIndex, wallColIndex] = wallCoord;
      return wallRowIndex !== cellRowIndex || wallColIndex !== cellColIndex;
    });
    setWallCoords(newWallCoords);
  };

  const addNewWall = (newWallRowIndex, newWallColIndex) => {
    setWallCoords([...wallCoords, [newWallRowIndex, newWallColIndex]]);
    updateCellStatus(newWallRowIndex, newWallColIndex, CELL_STATUS.WALL);
  };

  const handleOnCellClick = (cellStatus, cellRowIndex, cellColIndex) => {
    switch (gridStatus) {
      case GRID_STATUS.SET_START:
        if (cellStatus === CELL_STATUS.UNVISITED) {
          setNewStartCoords(cellRowIndex, cellColIndex);
        }
        break;
      case GRID_STATUS.SET_END:
        if (cellStatus === CELL_STATUS.UNVISITED) {
          setNewEndCoords(cellRowIndex, cellColIndex);
        }
        break;
      case GRID_STATUS.SET_WALL:
        if (cellStatus === CELL_STATUS.WALL) {
          removeExisitingWall(cellRowIndex, cellColIndex);
        } else if (cellStatus === CELL_STATUS.UNVISITED) {
          addNewWall(cellRowIndex, cellColIndex);
        }
        break;
      default:
        break;
    }
  };

  const handleGridStatusChange = (_, status) => {
    if (status === GRID_STATUS.CLEAR_GRID) {
      clearGrid();
      setGridStatus(GRID_STATUS.DEFAULT);
    } else {
      setGridStatus(status);
    }
  };

  const clearGrid = () => {
    setStartCellCoords([]);
    setEndCellCoords([]);
    setWallCoords([]);

    for (let row = 0; row < numOfRows; row++) {
      for (let col = 0; col < numOfCols; col++) {
        updateCellStatus(row, col, CELL_STATUS.UNVISITED);
      }
    }
  };

  const handleOnStart = () => {
    pathfindingAlgorithm(
      gridCells,
      startCellCoords,
      endCellCoords,
      updateCellStatus
    );
  };

  return (
    <div>
      <GridToolbar
        gridStatus={gridStatus}
        onGridStatusChange={handleGridStatusChange}
        onStart={handleOnStart}
        isReadyToStart={isReadyToStart}
      />
      <Grid gridCells={gridCells} handleOnCellClick={handleOnCellClick} />
    </div>
  );
};

export default GridWrapper;
