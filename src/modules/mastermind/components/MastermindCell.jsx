import React, { useEffect, useState } from "react";
import * as PropTypes from "prop-types";
import { Button, Paper, Typography, useTheme } from "@mui/material";
import { useDrop } from "react-dnd";

const MastermindCell = ({ value, size, onDrop, acceptsDrop }) => {
  const theme = useTheme();

  const canDrop = () => acceptsDrop;

  const handleDrop = ({ value }) => {
    onDrop(value);
  };

  const [{ isOver }, setDropRef] = useDrop({
    accept: ["SELECTABLE_COLOR"],
    canDrop: canDrop,
    drop: handleDrop,
    collect: (monitor) => ({
      isOver: monitor.canDrop() && monitor.isOver(),
    }),
  });

  return (
    <Paper
      ref={setDropRef}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: theme.spacing(size),
        height: theme.spacing(size),

        backgroundColor: theme.palette.mastermind[value].main,
        color: theme.palette.mastermind[value].contrastText,
        transition: "box-shadow 150ms, border 150ms",

        border:
          acceptsDrop && isOver
            ? "2px solid " + theme.palette.background.paper
            : "2px solid transparent",
        boxShadow: acceptsDrop && isOver ? theme.shadows[10] : "none",
      }}
    />
  );
};

MastermindCell.propTypes = {
  size: PropTypes.number,
  acceptsDrop: PropTypes.bool,
  onDrop: PropTypes.func,
};
MastermindCell.defaultProps = {
  size: 8,
  acceptsDrop: false,
  onDrop: () => {},
};

export default React.memo(MastermindCell);
