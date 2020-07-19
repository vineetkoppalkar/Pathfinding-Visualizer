import PriorityQueue from "../data structures/PriorityQueue";
import { CELL_STATUS } from "../constants/cellStatus";

const algorithmA = (
  gridCells,
  startCellCoords,
  endCellCoords,
  updateCellStatus
) => {
  // Create open list priority queue
  const openList = new PriorityQueue();

  // Create closed map
  const closedMap = {};

  // Make starting cell into a node (new CellNode())
  //  init(row, col)
  //  set actual cost to 0 (i.e. G(start cell) = 0)
  //  set previous to null
  // Add starting node into open list with priority 0
  //
  //
  // Create variable for currentNode
  // While open list is not empty
  //  dequeue node with lowest priority and assign to currentNode
  //  add currentNode into closed map
  //  Loop over cells adjacent to currentNode (Top, right, bottom, left)
  //    Ignore adjacent cells that are off-grid, walls or nodes in the closed map
  //    Create the adjacent node
  //      init(row, col)
  //      set prev node as currentNode
  //    Calculate priority using F(n) = G(n) + H(n)
  //      G(n) = G(currentNode) + 1
  //      H(n) = Manhattan distance from n to end cell
  //    add adjacent node into prority queue
  //
  //
  // If currentNode.coords == endCellCoords, then there exists a path from start to end
  // Backtrack until you reach starting node
  // Draw path by reversing the list
};

export default algorithmA;
