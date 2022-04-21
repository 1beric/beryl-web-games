import React, { useEffect, useState } from "react";
import * as PropTypes from "prop-types";
import { Button, Paper, Typography, useTheme } from "@mui/material";
import { useDrag, useDrop } from "react-dnd";
import { useSelector } from "react-redux";
import ShowerIcon from "@mui/icons-material/Shower";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import selectors from "../../../store/selectors";
import accessories from "../util/accessories";
import plantpedia from "../util/plantpedia";

const FarmInventoryItem = ({ size, item, type }) => {
  const theme = useTheme();

  const plants = useSelector(selectors.farmLife.getPlants);

  const [{ isDragging }, setDragRef] = useDrag({
    type: type,
    canDrag: true,
    item: {
      ...item,
      type: type,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const renderContent = () => {
    switch (type) {
      case accessories.WATER.id:
        return <ShowerIcon />;
      case accessories.SCYTHE.id:
        return <ContentCutIcon />;
      case "BABY":
        return plantpedia[item.id].babyName;
      case "GROWN":
        return plantpedia[plants[item.id].type].grownName;
      default:
        return null;
    }
  };

  const renderAmount = () => (
    <Paper
      sx={{
        position: "absolute",
        top: 0,
        right: 0,
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        borderRadius: "50%",
        width: theme.spacing(3),
        height: theme.spacing(3),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: "translate(25%, -25%)",
      }}
    >
      {item.amount}
    </Paper>
  );

  return (
    <Paper
      elevation={2}
      ref={setDragRef}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: theme.spacing(size),
        height: theme.spacing(size),

        padding: theme.spacing(1),

        position: "relative",

        border: "2px solid transparent",

        opacity: isDragging ? 0.3 : 1,
        transition:
          "box-shadow 150ms, border 150ms, background-color 150ms, opacity 150ms",
        "&:hover": {
          boxShadow: theme.shadows[10],
          border: "2px solid " + theme.palette.background.paper,
        },
      }}
    >
      <Typography sx={{ textAlign: "center" }}>{renderContent()}</Typography>
      {item.amount > 1 && renderAmount()}
    </Paper>
  );
};

FarmInventoryItem.propTypes = {
  size: PropTypes.number,
  acceptsDrop: PropTypes.bool,
};
FarmInventoryItem.defaultProps = {
  size: 8,
  acceptsDrop: false,
};

export default React.memo(FarmInventoryItem);
