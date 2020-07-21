import React from "react";
import Button from "@material-ui/core/Button";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { GRID_STATUS } from "../constants/gridStatus";

import "../assets/stylesheets/GridToolbar.scss";

const GridWrapper = ({
  gridStatus,
  onGridStatusChange,
  onStart,
  isReadyToStart,
}) => {
  return (
    <div className="grid-toolbar">
      <ToggleButtonGroup
        value={gridStatus}
        exclusive
        onChange={onGridStatusChange}
        aria-label="grid status selector"
      >
        <ToggleButton value={GRID_STATUS.SET_START} aria-label="Set start">
          Set start
        </ToggleButton>
        <ToggleButton value={GRID_STATUS.SET_END} aria-label="Set end">
          Set end
        </ToggleButton>
        <ToggleButton value={GRID_STATUS.SET_WALL} aria-label="Set wall">
          Set wall
        </ToggleButton>
        <ToggleButton value={GRID_STATUS.RESET_GRID} aria-label="Reset grid">
          Reset grid
        </ToggleButton>
        <ToggleButton value={GRID_STATUS.CLEAR_GRID} aria-label="Clear grid">
          Clear grid
        </ToggleButton>
      </ToggleButtonGroup>
      <Button
        variant="contained"
        color="primary"
        className="start-btn"
        onClick={() => onStart()}
        disabled={!isReadyToStart}
      >
        Start
      </Button>
    </div>
  );
};

export default GridWrapper;
