import React, { useState } from "react";
import * as PropTypes from "prop-types";
import { Button, Divider, Paper, Typography, useTheme } from "@mui/material";
import MastermindCell from "./MastermindCell";
import { Box } from "@mui/system";
import MastermindRowClue from "./MastermindRowClue";

const MastermindRow = ({
  values,
  size,
  handleCellChanged,
  editable,
  solution,
  showClue,
  hasClue,
  handleSubmit,
  canSubmit,
}) => {
  const theme = useTheme();

  const createHandleCellChanged = (index) => (value) =>
    handleCellChanged(index, value);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: theme.spacing(1),
        borderBottom: editable
          ? "2px solid " + theme.palette.primary.main
          : undefined,
        paddingBottom: editable ? theme.spacing(1) : undefined,
        borderTop: editable
          ? "2px solid " + theme.palette.primary.main
          : undefined,
        paddingTop: editable ? theme.spacing(1) : undefined,
        // padding: theme.spacing(2),
      }}
    >
      {values.map((value, index) => (
        <MastermindCell
          value={value}
          key={index}
          size={size}
          onDrop={createHandleCellChanged(index)}
          acceptsDrop={editable}
        />
      ))}
      {hasClue && (
        <Divider
          color={theme.palette.primary.main}
          orientation="vertical"
          flexItem
          light
        />
      )}
      {hasClue && (
        <MastermindRowClue
          values={values}
          solution={solution}
          showClue={showClue}
          size={size}
          showSubmit={editable}
          handleSubmit={handleSubmit}
          canSubmit={canSubmit}
        />
      )}
    </Box>
  );
};

MastermindRow.propTypes = {
  size: PropTypes.number,
  handleCellClicked: PropTypes.func,
};
MastermindRow.defaultProps = {
  size: 8,
  handleCellClicked: () => {},
};

export default React.memo(MastermindRow);
