import React, { useState } from "react";
import * as PropTypes from "prop-types";
import { Button, Divider, Paper, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import MastermindSelectorCell from "./MastermindSelectorCell";

const values = [1, 2, 3, 4, 5, 6];

const MastermindColorSelector = ({ size, setNextGuess }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: theme.spacing(size / 4),
      }}
    >
      {values.map((value, index) => (
        <MastermindSelectorCell
          value={value}
          key={index}
          size={size}
          setNextGuess={setNextGuess}
        />
      ))}
    </Box>
  );
};

MastermindColorSelector.propTypes = {};
MastermindColorSelector.defaultProps = {};

export default React.memo(MastermindColorSelector);
