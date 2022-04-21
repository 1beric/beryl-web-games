import React, { useState } from "react";
import * as PropTypes from "prop-types";
import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Paper,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import useRouteMatch from "../util/useRouteMatch";
import ROUTE_ELEMENTS from "../../body/util/routeElements";

const Header = () => {
  const theme = useTheme();

  const routeMatch = useRouteMatch(
    Object.values(ROUTE_ELEMENTS).map((route) => route.valuablePath)
  );

  const [colorblindMode, setColorblindMode] = useState(
    localStorage.getItem("colorblind")
  );
  const handleToggleColorblindMode = (event) => {
    if (colorblindMode === "ON") {
      setColorblindMode("OFF");
      localStorage.setItem("colorblind", "OFF");
    } else {
      setColorblindMode("ON");
      localStorage.setItem("colorblind", "ON");
    }
  };

  const renderTabs = () => {
    const currentTab = routeMatch?.pattern?.path || "/";
    return (
      <Tabs value={currentTab} variant="scrollable">
        {Object.values(ROUTE_ELEMENTS)
          .filter((route) => route.navable || route.header)
          .map((route) => (
            <Tab
              key={route.id}
              label={route.title}
              value={route.valuablePath}
              to={route.createPath()}
              component={RouterLink}
            />
          ))}
      </Tabs>
    );
  };

  return (
    <Paper
      sx={{
        display: "flex",
        height: 96,
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
        backgroundColor:
          theme.palette.mode === "light" && theme.palette.secondary.main,
        position: "relative",
      }}
    >
      <Box sx={{ display: "flex", gap: theme.spacing(2) }}>
        {/* <Button component={RouterLink} to="/" variant="contained">
          Beryl Web Games
        </Button> */}
        {renderTabs()}
      </Box>
      {/* <Box sx={{ display: "flex", gap: theme.spacing(2) }}>
        <Typography>Colorblind Mode</Typography>
        <Checkbox
          checked={colorblindMode === "ON"}
          size="small"
          onChange={handleToggleColorblindMode}
        />
      </Box> */}
    </Paper>
  );
};

Header.propTypes = {};
Header.defaultProps = {};

export default React.memo(Header);
