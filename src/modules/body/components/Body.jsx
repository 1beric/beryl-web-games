import React from "react";
import * as PropTypes from "prop-types";
import { Box, useTheme } from "@mui/material";
import LoadingBackdrop from "./LoadingBackdrop";
import ROUTE_ELEMENTS from "../util/routeElements";

const Body = ({ elementId }) => {
  const theme = useTheme();

  const renderBody = (Component) => <Component />;

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
      {/* <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          maxHeight: `calc(100% - ${theme.spacing(8)})`,
          flexShrink: 1,
          gap: theme.spacing(2),
          justifyContent: "center",
          alignItems: "start",
        }}
      > */}
      {renderBody(ROUTE_ELEMENTS[elementId].component)}
      {/* </Box> */}
      <LoadingBackdrop />
    </Box>
  );
};

Body.propTypes = {};
Body.defaultProps = {};

export default React.memo(Body);
