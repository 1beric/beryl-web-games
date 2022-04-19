import React from "react";
import * as PropTypes from "prop-types";
import { Button, Paper, useTheme } from "@mui/material";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";

const MastermindRowClue = ({
  values,
  solution,
  showClue,
  size,
  showSubmit,
  handleSubmit,
  canSubmit,
}) => {
  const theme = useTheme();

  const renderClue = (color, index) => (
    <Paper
      key={index}
      sx={{
        width: `calc(${theme.spacing(size / 2)} - 4px)`,
        height: `calc(${theme.spacing(size / 2)} - 4px)`,
        backgroundColor: color,
      }}
    />
  );

  const renderClues = () => {
    const clueColors = [];
    const afterSolution = [];
    const afterValues = [];
    for (let index = 0; index < solution.length; index++) {
      if (solution[index] === values[index]) {
        clueColors.push(theme.palette.success.main);
      } else {
        afterSolution.push(solution[index]);
        afterValues.push(values[index]);
      }
    }
    for (let index = 0; index < afterSolution.length; index++) {
      if (afterValues.includes(afterSolution[index])) {
        clueColors.push(theme.palette.warning.main);
        afterValues.splice(afterValues.indexOf(afterSolution[index]), 1);
      }
    }

    const emptySlots = 4 - clueColors.length;

    for (let index = 0; index < emptySlots; index++) {
      clueColors.push(undefined);
    }

    return clueColors.map(renderClue);
  };

  return (
    <Paper
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        flexWrap: "wrap",
        width: theme.spacing(size),
        height: theme.spacing(size),
        backgroundColor: theme.palette.mastermind[0].main,
        color: theme.palette.primary.main,

        border: "2px solid transparent",
        transition: "box-shadow 150ms, border 150ms",
      }}
    >
      {showClue && renderClues()}
      {showSubmit && (
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            minWidth: 0,
            padding: theme.spacing(0.5),
            width: "100%",
            height: "100%",
          }}
          disabled={!canSubmit()}
        >
          <KeyboardReturnIcon />
        </Button>
      )}
    </Paper>
  );
};

MastermindRowClue.propTypes = {
  size: PropTypes.number,
  onClick: PropTypes.func,
};
MastermindRowClue.defaultProps = {
  size: 8,
  onClick: () => {},
};

export default React.memo(MastermindRowClue);
