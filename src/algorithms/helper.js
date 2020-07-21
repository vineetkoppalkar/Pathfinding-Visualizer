export const getManhattanDistance = (fromRow, fromCol, toRow, toCol) => {
  return Math.abs(fromRow - toRow) + Math.abs(fromCol - toCol);
};

export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};
