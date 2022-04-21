import React, { useState } from "react";
import * as PropTypes from "prop-types";
import { Button, Paper, Typography, useTheme } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { Box } from "@mui/system";

const ReduxLoading = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: `calc(100% - ${theme.spacing(4)})`,
        height: `calc(100% - 96px - ${theme.spacing(4)})`,
        maxHeight: `calc(100% - 96px - ${theme.spacing(4)})`,
        gap: theme.spacing(2),
        justifyContent: "flex-start",
        alignItems: "center",
        margin: theme.spacing(2),
      }}
    >
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: theme.spacing(2),
          padding: theme.spacing(2),
          width: "60%",
          minWidth: 256,
          maxHeight: "-webkit-fill-available",
        }}
      >
        <Typography variant="h5">Beryl Web Games</Typography>
        <Typography variant="body1">Loading...</Typography>
      </Paper>
    </Box>
  );
};

ReduxLoading.propTypes = {};
ReduxLoading.defaultProps = {};

export default React.memo(ReduxLoading);
