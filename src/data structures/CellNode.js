class CellNode {
  constructor(rowIndex, colIndex) {
    this.rowIndex = rowIndex;
    this.colIndex = colIndex;
    this.actualCost = 0;
    this.parentCellNode = null;
  }

  setActualCost(costValue) {
    this.actualCost = costValue;
  }

  setParentNode(parentCellNode) {
    this.parentCellNode = parentCellNode;
  }
}
