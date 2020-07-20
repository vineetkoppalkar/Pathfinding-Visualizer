export const getManhattanDistance = (fromRow, fromCol, toRow, toCol) => {
  return Math.abs(fromRow - toRow) + Math.abs(fromCol - toCol);
};
