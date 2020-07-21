import PriorityQueue from "../data structures/PriorityQueue";
import { getManhattanDistance } from "./helper";
import CellNode from "../data structures/CellNode";
import { CELL_STATUS } from "../constants/cellStatus";

const algorithmA = (
  gridCells,
  startCellCoords,
  endCellCoords,
  updateCellStatus
) => {
  const totalNumOfRows = gridCells.length;
  const totalNumOfCols = gridCells[0].length;

  const openQueue = new PriorityQueue();
  const closedMap = {};

  const [startRowIndex, startColIndex] = startCellCoords;
  const [endRowIndex, endColIndex] = endCellCoords;

  const startingCellNode = new CellNode(
    startRowIndex,
    startColIndex,
    gridCells[(startRowIndex, startColIndex)]
  );

  openQueue.enqueue(startingCellNode, 0);

  const isCoordOffGrid = (rowIndex, colIndex) => {
    if (rowIndex < 0 || rowIndex >= totalNumOfRows) return true;
    if (colIndex < 0 || colIndex >= totalNumOfCols) return true;
    return false;
  };

  const isAWall = (rowIndex, colIndex) => {
    return gridCells[rowIndex][colIndex] === CELL_STATUS.WALL;
  };

  const isInClosedMap = (rowIndex, colIndex) => {
    return `[${rowIndex}, ${colIndex}]` in closedMap;
  };

  const isValidAdjacentCell = (rowIndex, colIndex) => {
    return (
      !isNaN(rowIndex) &&
      !isNaN(colIndex) &&
      !isCoordOffGrid(rowIndex, colIndex) &&
      !isAWall(rowIndex, colIndex) &&
      !isInClosedMap(rowIndex, colIndex)
    );
  };

  const addAdjacentCellNode = (
    currentNode,
    adjacentCellRowIndex,
    adjacentCellColIndex
  ) => {
    if (!isValidAdjacentCell(adjacentCellRowIndex, adjacentCellColIndex)) {
      return;
    }

    const adjacentNode = new CellNode(
      adjacentCellRowIndex,
      adjacentCellColIndex,
      gridCells[adjacentCellRowIndex][adjacentCellColIndex]
    );
    adjacentNode.setPreviousNode(currentNode);
    adjacentNode.setActualCost(currentNode.actualCost + 1);

    const heuristicCost = getManhattanDistance(
      adjacentNode.rowIndex,
      adjacentNode.colIndex,
      endRowIndex,
      endColIndex
    );

    const adjacentNodePriority = adjacentNode.actualCost + heuristicCost;

    if (openQueue.contains(adjacentNode)) {
      const existingPriority = openQueue.getPriorityOf(adjacentNode);

      if (adjacentNodePriority < existingPriority) {
        openQueue.remove(adjacentNode);
      }
    }

    updateCellStatus(
      adjacentNode.rowIndex,
      adjacentNode.colIndex,
      CELL_STATUS.CHECKING
    );

    openQueue.enqueue(adjacentNode, adjacentNodePriority);
  };

  let currentNode = null;
  while (!openQueue.isEmpty()) {
    // dequeue node with lowest priority and assign to currentNode
    currentNode = openQueue.dequeue().element;

    // add currentNode into closed map
    closedMap[currentNode.toString()] = currentNode;
    updateCellStatus(
      currentNode.rowIndex,
      currentNode.colIndex,
      CELL_STATUS.VISITED
    );

    if (
      currentNode.rowIndex === endRowIndex &&
      currentNode.colIndex === endColIndex
    ) {
      break;
    }

    // Top adjacent cell
    const topCellRowIndex = currentNode.rowIndex - 1;
    const topCellColIndex = currentNode.colIndex;
    addAdjacentCellNode(currentNode, topCellRowIndex, topCellColIndex);

    // Right adjacent cell
    const rightCellRowIndex = currentNode.rowIndex;
    const rightCellColIndex = currentNode.colIndex + 1;
    addAdjacentCellNode(currentNode, rightCellRowIndex, rightCellColIndex);

    // Bottom adjacent cell
    const bottomCellRowIndex = currentNode.rowIndex + 1;
    const bottomCellColIndex = currentNode.colIndex;
    addAdjacentCellNode(currentNode, bottomCellRowIndex, bottomCellColIndex);

    // Left adjacent cell
    const leftCellRowIndex = currentNode.rowIndex;
    const leftCellColIndex = currentNode.colIndex - 1;
    addAdjacentCellNode(currentNode, leftCellRowIndex, leftCellColIndex);
  }

  if (
    currentNode.rowIndex !== endRowIndex &&
    currentNode.colIndex !== endColIndex
  ) {
    updateCellStatus(startRowIndex, startColIndex, CELL_STATUS.START);
    return;
  }

  const shortestPath = [];
  while (currentNode.previousCellNode !== null) {
    shortestPath.unshift([currentNode.rowIndex, currentNode.colIndex]);
    currentNode = currentNode.previousCellNode;
  }
  shortestPath.unshift([currentNode.rowIndex, currentNode.colIndex]);

  for (let i = 0; i < shortestPath.length; i++) {
    const [rowIndex, colIndex] = shortestPath[i];
    let cellStatus;
    if (i === 0) {
      cellStatus = CELL_STATUS.START;
    } else if (i === shortestPath.length - 1) {
      cellStatus = CELL_STATUS.END;
    } else {
      cellStatus = CELL_STATUS.PATH;
    }
    updateCellStatus(rowIndex, colIndex, cellStatus);
  }
};

export default algorithmA;
