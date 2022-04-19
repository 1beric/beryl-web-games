import React from "react";
import * as PropTypes from "prop-types";
import { Backdrop, CircularProgress, Paper, useTheme } from "@mui/material";

const LoadingBackdrop = () => {
  const theme = useTheme();

  return (
    <Backdrop open={false}>
      <CircularProgress size={window.innerHeight * 0.05} />
    </Backdrop>
  );
};

LoadingBackdrop.propTypes = {};
LoadingBackdrop.defaultProps = {};

export default React.memo(LoadingBackdrop);
