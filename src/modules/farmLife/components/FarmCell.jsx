import React, { useEffect, useState } from "react";
import * as PropTypes from "prop-types";
import { Button, Paper, Typography, useTheme } from "@mui/material";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import selectors from "../../../store/selectors";
import actions from "../../../store/actions";
import {
  getTileId,
  plantIsDead,
  plantIsGrown,
  WATER_TIME,
} from "../util/farmLife";
import useUpdate from "../../../util/useUpdate";
import { minutes } from "../../../util/time";
import accessories from "../util/accessories";
import plantpedia from "../util/plantpedia";
import { Close } from "@mui/icons-material";
import ParkIcon from "@mui/icons-material/Park";

const FarmCell = ({ x, y, tile, size, spaceSize }) => {
  const theme = useTheme();

  const plants = useSelector(selectors.farmLife.getPlants);

  useUpdate(minutes(30));

  const dispatch = useDispatch();
  const handleDrop = (item) =>
    dispatch(actions.farmLife.itemDroppedOnCell(getTileId(x, y), item));

  const isPlantHarvestable = () => {
    const plant = plants[tile.plantId];
    const grown = plantIsGrown(plant);
    const dead = plantIsDead(plant, { watered: tile.watered });
    return grown || dead;
  };

  const canDrop = ({ type }) => {
    switch (type) {
      case accessories.WATER.id:
        return true;
      case accessories.SCYTHE.id:
        return tile && tile.plantId && isPlantHarvestable();
      case "BABY":
        return !tile || !tile.plantId;
      default:
        return false;
    }
  };

  const [{ isOver }, setDropRef] = useDrop(
    {
      accept: [accessories.WATER.id, accessories.SCYTHE.id, "BABY"],
      canDrop: canDrop,
      drop: handleDrop,
      collect: (monitor) => ({
        isOver: monitor.canDrop() && monitor.isOver(),
      }),
    },
    [tile]
  );

  const getContentName = () => {
    const plant = plants[tile.plantId];
    if (plantIsGrown(plant)) return plantpedia[plant.type].grownName;
    return plantpedia[plant.type].babyName;
  };

  const renderContent = () => {
    return (
      <Typography
        sx={{
          zIndex: 1,
          textAlign: "center",
          maxWidth: "100%",
          maxHeight: "100%",
          textOverflow: "clip",
          msTextOverflow: "clip",
          whiteSpace: "normal",
          overflow: "hidden",
        }}
      >
        {getContentName()}
      </Typography>
    );
  };

  const getBorder = () => {
    if (!tile || !tile.plantId) {
      return isOver
        ? `2px solid ${theme.palette.background.paper}`
        : "2px solid transparent";
    }
    const plant = plants[tile.plantId];
    const { watered } = tile;
    const grown = plantIsGrown(plant);
    const dead = plantIsDead(plant, { watered: watered });
    if (dead) return `2px solid ${theme.palette.error.main}`;
    if (grown) return `2px solid ${theme.palette.primary.main}`;
    return isOver
      ? `2px solid ${theme.palette.background.paper}`
      : "2px solid transparent";
  };

  const getWateredOpacity = () => {
    if (!tile) return 0;

    const current = new Date().valueOf();
    const { watered } = tile;

    const diff = current - watered;
    if (diff > WATER_TIME) return 0;

    const factor = (WATER_TIME - diff) / WATER_TIME;

    return factor;
  };

  const renderWater = () => (
    <Paper
      // square
      sx={{
        width: "100%",
        height: "100%",

        position: "absolute",
        left: -2,
        top: -2,

        border: getBorder(),
        backgroundColor: theme.palette.farmLife.soil.watered,
        opacity: getWateredOpacity(),
        pointerEvents: "none",
      }}
    />
  );

  return (
    <Paper
      ref={setDropRef}
      // square
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: theme.spacing(size),
        height: theme.spacing(size),
        boxSizing: "border-box",

        position: "absolute",
        left: `calc(${theme.spacing(size * x)} + ${theme.spacing(
          spaceSize * (x + 1)
        )})`,
        top: `calc(${theme.spacing(size * y)} + ${theme.spacing(
          spaceSize * (y + 1)
        )})`,

        textOverflow: "clip",

        backgroundColor: theme.palette.farmLife.soil.dry,
        color: theme.palette.farmLife.soil.contrastText,
        border: getBorder(),
        boxShadow: isOver ? theme.shadows[10] : "none",

        transition: "box-shadow 150ms, border 150ms",
      }}
    >
      {tile && renderWater()}
      {tile && tile.plantId && renderContent()}
      {/* {tile && tile.plantId && renderGrowth()} */}
    </Paper>
  );
};

FarmCell.propTypes = {
  size: PropTypes.number,
  acceptsDrop: PropTypes.bool,
};
FarmCell.defaultProps = {
  size: 8,
  acceptsDrop: false,
};

export default React.memo(FarmCell);
