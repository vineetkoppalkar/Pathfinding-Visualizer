class CellNode {
  constructor(rowIndex, colIndex, status) {
    this.rowIndex = rowIndex;
    this.colIndex = colIndex;
    this.status = status;
    this.actualCost = 0;
    this.previousCellNode = null;
  }

  setActualCost(costValue) {
    this.actualCost = costValue;
  }

  setPreviousNode(previousCellNode) {
    this.previousCellNode = previousCellNode;
  }

  toString() {
    return `[${this.rowIndex}, ${this.colIndex}]`;
  }

  equals(object) {
    if (object === null) {
      return false;
    }

    if (!(object instanceof CellNode)) {
      return false;
    }

    if (object.rowIndex !== this.rowIndex) {
      return false;
    }

    if (object.colIndex !== this.colIndex) {
      return false;
    }

    if (object.status !== this.status) {
      return false;
    }

    return true;
  }
}

export default CellNode;
