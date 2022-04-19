import React, { useState } from "react";
import * as PropTypes from "prop-types";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import ROUTE_ELEMENTS from "../../body/util/routeElements";
import MastermindRow from "./MastermindRow";
import ShareIcon from "@mui/icons-material/Share";

const MastermindCompleted = ({
  correctSubmission,
  guessesSubmitted,
  guesses,
  solution,
  id,
}) => {
  const theme = useTheme();

  const handleShareClicked = () => {
    const lines = [];
    if (correctSubmission) {
      lines.push("Mastermind (" + id + ") " + guessesSubmitted + "/8");
    } else {
      lines.push("Mastermind (" + id + ") X/8");
    }
    // for (let index = 0; index < guessesSubmitted; index++) {
    //   lines.push(guesses[index].join(" "));
    // }
    lines.push(process.env.PUBLIC_URL + "/mastermind/" + id);

    navigator.clipboard.writeText(lines.join("\n"));
  };

  const renderTitle = () => {
    if (correctSubmission) {
      return "Congratulations";
    }
    if (guessesSubmitted === 8) {
      return "Game Over";
    }
    return "";
  };

  const renderContent = () => {
    if (correctSubmission) {
      return (
        <>
          <Typography variant="body1">Congrats, that is correct!</Typography>
          <MastermindRow values={solution} />
        </>
      );
    }
    if (guessesSubmitted === 8) {
      return (
        <>
          <Typography variant="body1">
            Unlucky, better luck next time!
          </Typography>
          <MastermindRow values={solution} />
        </>
      );
    }
    return null;
  };

  return (
    <Dialog open={correctSubmission || guessesSubmitted === 8}>
      <DialogTitle>{renderTitle()}</DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: theme.spacing(1) }}
      >
        {renderContent()}
      </DialogContent>
      <DialogActions sx={{ display: "flex", gap: theme.spacing(2) }}>
        <Button onClick={handleShareClicked} variant="contained">
          <ShareIcon />
        </Button>
        <Button
          component={Link}
          to={ROUTE_ELEMENTS.MASTERMIND.createPath()}
          variant="contained"
        >
          Start a new game
        </Button>
      </DialogActions>
    </Dialog>
  );
};

MastermindCompleted.propTypes = {};
MastermindCompleted.defaultProps = {};

export default React.memo(MastermindCompleted);
