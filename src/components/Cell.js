import React from "react";
import { CELL_STATUS } from "../constants/cellStatus";

import "../assets/stylesheets/Cell.scss";

const getCellStyle = (status) => {
  const baseStyle = "cell";
  switch (status) {
    case CELL_STATUS.START:
      return `${baseStyle}--start`;
    case CELL_STATUS.END:
      return `${baseStyle}--end`;
    case CELL_STATUS.CHECKING:
      return `${baseStyle}--checking`;
    case CELL_STATUS.VISITED:
      return `${baseStyle}--visited`;
    case CELL_STATUS.WALL:
      return `${baseStyle}--wall`;
    default:
      return baseStyle;
  }
};

const Cell = ({ status }) => {
  return <div className={getCellStyle(status)} />;
};

export default Cell;
