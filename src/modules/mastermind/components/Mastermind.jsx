import React, { useState } from "react";
import * as PropTypes from "prop-types";
import { Box, Button, Paper, Typography, useTheme } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { DndContext, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import useMastermind from "../util/useMastermind";
import MastermindRow from "./MastermindRow";
import MastermindColorSelector from "./MastermindColorSelector";
import MastermindCompleted from "./MastermindCompleted";
import MastermindNoGame from "./MastermindNoGame";

const Mastermind = () => {
  const theme = useTheme();

  const { mastermindId } = useParams();

  const {
    solution,
    guesses,
    setGuess,
    submitGuess,
    guessesSubmitted,
    canSubmit,
    correctSubmission,
    setNextGuess,
  } = useMastermind(mastermindId);

  const handleSubmit = submitGuess;
  const handleCellChanged = (index, value) => {
    setGuess(index, value);
  };

  const renderGame = () => (
    <Paper
      elevation={2}
      sx={{
        display: "flex",
        flexDirection: "column-reverse",
        gap: theme.spacing(1),
        padding: theme.spacing(2),
        justifyContent: "flex-end",
        alignItems: "center",
        overflow: "auto",
      }}
    >
      {guesses.map((row, index) => (
        <MastermindRow
          key={index}
          values={row}
          handleCellChanged={handleCellChanged}
          size={8}
          editable={!correctSubmission && guessesSubmitted === index}
          showClue={index < guessesSubmitted}
          solution={solution}
          handleSubmit={handleSubmit}
          canSubmit={canSubmit}
          hasClue
        />
      ))}
    </Paper>
  );

  if (!mastermindId) {
    return <MastermindNoGame />;
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",

          gap: theme.spacing(2),
          padding: theme.spacing(2),
          width: "60%",
          minWidth: 256,
          maxHeight: "-webkit-fill-available",
        }}
      >
        <MastermindColorSelector size={8} setNextGuess={setNextGuess} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: theme.spacing(2),
            padding: theme.spacing(2),
            maxHeight: "-webkit-fill-available",
          }}
        >
          <Typography variant="h5">Mastermind</Typography>
          {renderGame()}
          <MastermindCompleted
            id={mastermindId}
            guesses={guesses}
            solution={solution}
            guessesSubmitted={guessesSubmitted}
            correctSubmission={correctSubmission}
          />
        </Box>
      </Paper>
    </DndProvider>
  );
};

Mastermind.propTypes = {};
Mastermind.defaultProps = {};

export default React.memo(Mastermind);
