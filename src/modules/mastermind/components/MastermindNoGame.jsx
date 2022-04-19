import React, { useState } from "react";
import * as PropTypes from "prop-types";
import { Box, Button, Paper, Typography, useTheme } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import ROUTE_ELEMENTS from "../../body/util/routeElements";

const MastermindNoGame = () => {
  const theme = useTheme();

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",

        gap: theme.spacing(2),
        padding: theme.spacing(2),
        width: "60%",
        minWidth: 256,
        maxHeight: "-webkit-fill-available",
      }}
    >
      <Typography variant="h5">Mastermind</Typography>
      <Button
        component={Link}
        to={ROUTE_ELEMENTS.MASTERMIND.createPath()}
        variant="contained"
      >
        Start a game
      </Button>
    </Paper>
  );
};

MastermindNoGame.propTypes = {};
MastermindNoGame.defaultProps = {};

export default React.memo(MastermindNoGame);
