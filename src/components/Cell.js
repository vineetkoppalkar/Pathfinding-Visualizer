import React from "react";
import { CELL_STATUS } from "../constants/cellStatus";

import "../assets/stylesheets/Cell.scss";

const getCellStyle = (baseStyle, status) => {
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
      return "";
  }
};

const Cell = ({ status }) => {
  const BASE_CELL_STYLE = "cell";

  return (
    <div
      className={`${BASE_CELL_STYLE} ${getCellStyle(BASE_CELL_STYLE, status)}`}
    />
  );
};

export default Cell;
