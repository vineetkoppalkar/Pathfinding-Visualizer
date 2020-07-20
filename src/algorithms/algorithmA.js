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

  // Create open priority queue
  const openQueue = new PriorityQueue();

  // Create closed map
  const closedMap = {};

  // Make starting cell into a node (new CellNode())
  //  init(row, col)
  //  set actual cost to 0 (i.e. G(start cell) = 0)
  //  set previous to null
  const [startRowIndex, startColIndex] = startCellCoords;
  const startingCellNode = new CellNode(
    startRowIndex,
    startColIndex,
    gridCells[(startRowIndex, startColIndex)]
  );

  // Add starting node into open queue with priority 0
  openQueue.enqueue(startingCellNode, 0);

  const isCoordOffGrid = (rowIndex, colIndex) => {
    if (rowIndex < 0 || rowIndex >= totalNumOfRows) return true;
    if (colIndex < 0 || colIndex >= totalNumOfCols) return true;
    return false;
  };

  const isAWall = (rowIndex, colIndex) => {
    console.log("cell state", gridCells[rowIndex][colIndex]);
    return gridCells[rowIndex][colIndex] === CELL_STATUS.WALL;
  };

  const isInClosedMap = (rowIndex, colIndex) => {
    return `[${rowIndex}, ${colIndex}]` in closedMap;
  };

  const isValidAdjacentCell = (rowIndex, colIndex) => {
    return (
      rowIndex >= 0 &&
      colIndex >= 0 &&
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
      console.log("Adjacent cell is INVALID");
      return;
    }
    console.log("Adjacent cell is valid");

    const adjacentNode = new CellNode(
      adjacentCellRowIndex,
      adjacentCellColIndex,
      gridCells[adjacentCellRowIndex][adjacentCellColIndex]
    );
    adjacentNode.setPreviousNode = currentNode;
    adjacentNode.setActualCost(currentNode.actualCost + 1);

    const [endCellRowIndex, endCellColIndex] = endCellCoords;
    const heuristicCost = getManhattanDistance(
      adjacentNode.rowIndex,
      adjacentNode.colIndex,
      endCellRowIndex,
      endCellColIndex
    );
    console.log("heuristicCost", heuristicCost);
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
    console.log(
      CELL_STATUS.CHECKING,
      "status added to",
      adjacentNode.rowIndex,
      adjacentNode.colIndex
    );
    console.log("adjacentNodePriority", adjacentNodePriority);
    openQueue.enqueue(adjacentNode, adjacentNodePriority);
  };

  // Create variable for currentNode
  let currentNode = null;

  // While open queue is not empty
  while (!openQueue.isEmpty()) {
    console.log();
    console.log();
    console.log(
      "in while loop",
      "grid:",
      gridCells,
      "End coords are",
      endCellCoords
    );
    // dequeue node with lowest priority and assign to currentNode
    currentNode = openQueue.dequeue().element;
    console.log("currentNode is", currentNode.toString());

    // add currentNode into closed map
    closedMap[currentNode.toString()] = currentNode;
    updateCellStatus(
      currentNode.rowIndex,
      currentNode.colIndex,
      CELL_STATUS.VISITED
    );

    const [endCellRowIndex, endCellColIndex] = endCellCoords;
    if (
      currentNode.rowIndex === endCellRowIndex &&
      currentNode.colIndex === endCellColIndex
    ) {
      break;
    }

    // Loop over cells adjacent to currentNode (Top, right, bottom, left)
    //  Ignore adjacent cells that are off-grid, walls or nodes in the closed map
    //  Create the adjacent node
    //    init(row, col)
    //    set prev node as currentNode
    //  Calculate priority using F(n) = G(n) + H(n)
    //    G(n) = G(currentNode) + 1
    //    H(n) = Manhattan distance from n to end cell
    //  add adjacent node into prority queue

    // Top adjacent cell
    const topCellRowIndex = currentNode.rowIndex - 1;
    const topCellColIndex = currentNode.colIndex;
    console.log("Top", topCellRowIndex, topCellColIndex);
    addAdjacentCellNode(currentNode, topCellRowIndex, topCellColIndex);

    // Right adjacent cell
    const rightCellRowIndex = currentNode.rowIndex;
    const rightCellColIndex = currentNode.colIndex + 1;
    console.log("Right", rightCellRowIndex, rightCellColIndex);
    addAdjacentCellNode(currentNode, rightCellRowIndex, rightCellColIndex);

    // Bottom adjacent cell
    const bottomCellRowIndex = currentNode.rowIndex + 1;
    const bottomCellColIndex = currentNode.colIndex;
    console.log("Bottom", bottomCellRowIndex, bottomCellColIndex);
    addAdjacentCellNode(currentNode, bottomCellRowIndex, bottomCellColIndex);

    // Left adjacent cell
    const leftCellRowIndex = currentNode.rowIndex;
    const leftCellColIndex = currentNode.colIndex - 1;
    console.log("Left", leftCellRowIndex, leftCellColIndex);
    addAdjacentCellNode(currentNode, leftCellRowIndex, leftCellColIndex);
  }
  //
  //
  // If currentNode.coords == endCellCoords, then there exists a path from start to end
  // Backtrack until you reach starting node
  // Draw path by reversing the list
};

export default algorithmA;
