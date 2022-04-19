import React, { useEffect, useState } from "react";
import * as PropTypes from "prop-types";
import { Button, Paper, Typography, useTheme } from "@mui/material";
import { useDrag } from "react-dnd";

const MastermindCell = ({ value, size }) => {
  const theme = useTheme();

  const [{ isDragging }, setDragRef] = useDrag({
    type: "SELECTABLE_COLOR",
    canDrag: true,
    item: {
      value: value,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <Paper
      ref={setDragRef}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: theme.spacing(size),
        height: theme.spacing(size),
        backgroundColor: theme.palette.mastermind[value].main,
        color: theme.palette.mastermind[value].contrastText,
        opacity: isDragging ? 0.3 : 1,
        // border: "2px solid " + theme.palette.background.paper,
        border: "2px solid transparent",
        transition:
          "box-shadow 150ms, border 150ms, background-color 150ms, opacity 150ms",
        "&:hover": {
          boxShadow: theme.shadows[10],
          border: "2px solid " + theme.palette.background.paper,
        },
      }}
    >
      {/* {colorblindMode === "ON" && (
        <Typography variant="subtitle1">{value}</Typography>
      )} */}
    </Paper>
  );
};

MastermindCell.propTypes = {
  selectedColor: PropTypes.number,
  size: PropTypes.number,
  onClick: PropTypes.func,
};
MastermindCell.defaultProps = {
  selectedColor: 1,
  size: 8,
  onClick: () => {},
};

export default React.memo(MastermindCell);
