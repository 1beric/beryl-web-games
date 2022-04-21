import React, { useState } from "react";
import * as PropTypes from "prop-types";
import { Button, Paper, Typography, useTheme, withTheme } from "@mui/material";
import { Box } from "@mui/system";
import themes from "../../../util/theme";

const theme = themes.darkTheme;

const refresh = () => {
  // eslint-disable-next-line no-restricted-globals
  location.reload();
};

const resetRedux = () => {
  localStorage.clear();
  refresh();
};

const refreshOverride = (event) => {
  if (event.key === "R" && event.shiftKey && event.ctrlKey) resetRedux();
};

class ErrorHandler extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidMount() {
    document.addEventListener("keydown", refreshOverride);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", refreshOverride);
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error: error, errorInfo: errorInfo });
  }

  clearError() {
    this.setState({ error: null, errorInfo: null });
  }

  render() {
    const { error, errorInfo } = this.state;
    const { children } = this.props;
    if (error) {
      return (
        <Paper
          square
          elevation={0}
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100vw",
            height: "100vh",
            gap: theme.spacing(2),
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
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
            <Typography variant="h3">Caught Error!!</Typography>
            <Paper
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                padding: theme.spacing(2),
                gap: theme.spacing(0.5),
              }}
            >
              <Typography variant="body1">{error.toString()}</Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: theme.spacing(2),
                  gap: theme.spacing(1),
                }}
              >
                <Button onClick={resetRedux}>Reset Redux</Button>
                <Button onClick={refresh}>Refresh</Button>
                <Button onClick={this.clearError}>Clear</Button>
              </Box>
            </Paper>
          </Box>
        </Paper>
      );
    }
    return children;
  }
}

export default ErrorHandler;
