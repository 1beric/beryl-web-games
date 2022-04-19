import React, { useState } from "react";
import * as PropTypes from "prop-types";
import { Button, Paper, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import ROUTE_ELEMENTS from "../../body/util/routeElements";

const Home = () => {
  const theme = useTheme();

  return (
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
      <Paper
        elevation={2}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: theme.spacing(1),
          padding: theme.spacing(2),
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        {Object.values(ROUTE_ELEMENTS)
          .filter((route) => route.navable)
          .map((route) => (
            <Button
              key={route.id}
              value={route.path}
              to={route.createPath()}
              component={Link}
            >
              {route.title}
            </Button>
          ))}
      </Paper>
    </Paper>
  );
};

Home.propTypes = {};
Home.defaultProps = {};

export default React.memo(Home);
