import React, { useState } from "react";
import * as PropTypes from "prop-types";
import { Box, Button, Paper, Typography, useTheme } from "@mui/material";
import { useSelector } from "react-redux";

import selectors from "../../../store/selectors";
import { getTileId } from "../util/farmLife";
import FarmCell from "./FarmCell";
import { isMobile } from "../../../util/platform";

const CELL_SIZE = isMobile() ? 4 : 8;
const SPACE_SIZE = isMobile() ? 0.5 : 1;

const FarmGrid = ({ saveId }) => {
  const theme = useTheme();

  const tiles = useSelector(selectors.farmLife.getTiles(saveId));
  const farmSize = useSelector(selectors.farmLife.getSize(saveId));

  const renderCells = () => {
    const cells = [];
    for (let x = 0; x < farmSize; x++) {
      for (let y = 0; y < farmSize; y++) {
        const tileId = getTileId(x, y);
        cells.push(
          <FarmCell
            key={tileId}
            x={x}
            y={y}
            size={CELL_SIZE}
            spaceSize={SPACE_SIZE}
            tile={tiles[tileId]}
          />
        );
      }
    }
    return cells;
  };

  return (
    <Box
      sx={{
        maxWidth: "100%",
        overflow: "auto",
      }}
    >
      <Paper
        elevation={2}
        sx={{
          position: "relative",
          width: `calc(${theme.spacing(CELL_SIZE * farmSize)} + ${theme.spacing(
            SPACE_SIZE * (farmSize + 1)
          )})`,
          height: `calc(${theme.spacing(
            CELL_SIZE * farmSize
          )} + ${theme.spacing(SPACE_SIZE * (farmSize + 1))})`,
        }}
      >
        {renderCells()}
      </Paper>
    </Box>
  );
};

FarmGrid.propTypes = {};
FarmGrid.defaultProps = {};

export default React.memo(FarmGrid);
