import React, { useEffect, useState } from "react";
import * as PropTypes from "prop-types";
import { Button, Paper, Typography, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import selectors from "../../../store/selectors";
import FarmInventoryItem from "./FarmInventoryItem";
import { Box } from "@mui/system";
import plantpedia from "../util/plantpedia";

const FarmInventory = ({ saveId }) => {
  const theme = useTheme();

  const inventory = useSelector(selectors.farmLife.getInventory(saveId));
  const plants = useSelector(selectors.farmLife.getPlants);

  const renderContent = () => [
    ...Object.values(inventory.accessories).map((item) => (
      <FarmInventoryItem key={item.id} size={8} item={item} type={item.id} />
    )),
    ...Object.values(inventory.seeds).map((item) => (
      <FarmInventoryItem key={item.id} size={8} item={item} type="BABY" />
    )),
    ...Object.values(inventory.plants).map((item) => (
      <FarmInventoryItem key={item.id} size={8} item={item} type="GROWN" />
    )),
  ];

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: theme.spacing(1),
        // padding: theme.spacing(2),
      }}
    >
      {renderContent()}
    </Box>
  );
};

FarmInventory.propTypes = {
  size: PropTypes.number,
  acceptsDrop: PropTypes.bool,
};
FarmInventory.defaultProps = {
  size: 8,
  acceptsDrop: false,
};

export default React.memo(FarmInventory);
