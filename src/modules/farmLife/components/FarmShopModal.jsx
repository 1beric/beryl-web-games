import React, { useState } from "react";
import * as PropTypes from "prop-types";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import selectors from "../../../store/selectors";
import shops from "../util/shops";
import plantpedia from "../util/plantpedia";
import actions from "../../../store/actions";

const FarmShopModal = ({ saveId, shopId, handleClose }) => {
  const theme = useTheme();

  const { inventory, currency } = useSelector(
    selectors.farmLife.getSave(saveId)
  );

  const plants = useSelector(selectors.farmLife.getPlants);

  const dispatch = useDispatch();

  const createHandleItemSold = (inventoryItem, shopItem) => () =>
    dispatch(actions.farmLife.sellItem(inventoryItem, shopItem));
  const createHandleItemBought = (shopItem) => () =>
    dispatch(actions.farmLife.buyItem(shopItem));

  const playerCanBuy = (item) => currency >= item.price;

  const renderPurchasables = () => (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: theme.spacing(1),
      }}
    >
      {Object.values(shops[shopId].items.purchasable).map((shopItem) => (
        <Box
          key={shopItem.id}
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: theme.spacing(1),
            // gap: theme.spacing(1),
            border: `1px solid ${theme.palette.primary.main}`,
            color: theme.palette.primary.main,
            // alignItems: "center",
            borderRadius: 2,
          }}
        >
          <Typography variant="h6">
            {plantpedia[shopItem.id].babyName}
          </Typography>
          <Button
            variant="contained"
            disabled={!playerCanBuy(shopItem)}
            onClick={createHandleItemBought(shopItem)}
          >
            {shopItem.price}
          </Button>
        </Box>
      ))}
    </Box>
  );

  const renderSellables = () => (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: theme.spacing(2),
      }}
    >
      {Object.values(inventory.plants)
        .map((item) => ({
          inventoryItem: item,
          shopItem: shops[shopId].items.sellable[plants[item.id].type],
        }))
        .filter(({ shopItem }) => Boolean(shopItem))
        .map(({ inventoryItem, shopItem }) => (
          <Box
            key={shopItem.id}
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: theme.spacing(1),
              // gap: theme.spacing(1),
              border: `1px solid ${theme.palette.primary.main}`,
              color: theme.palette.primary.main,
              // alignItems: "center",
              borderRadius: 2,
            }}
          >
            <Typography variant="h6">
              {plantpedia[shopItem.id].grownName}
            </Typography>
            <Button
              variant="contained"
              onClick={createHandleItemSold(inventoryItem, shopItem)}
            >
              {shopItem.price}
            </Button>
          </Box>
        ))}
    </Box>
  );

  return (
    <Dialog
      open={Boolean(shopId)}
      onClose={handleClose}
      transitionDuration={{
        enter: 200,
        appear: 200,
        exit: 0,
      }}
    >
      <DialogTitle>
        {shopId ? shops[shopId].name : ""}
        <Typography
          variant="subtitle1"
          sx={{
            position: "absolute",
            top: theme.spacing(2),
            right: theme.spacing(2),
            padding: `${theme.spacing(0.5)} ${theme.spacing(1)}`,
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            borderRadius: 2,
          }}
        >
          Currency: {currency}
        </Typography>
      </DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: theme.spacing(1) }}
      >
        {shopId &&
          Object.values(shops[shopId].items.purchasable).length > 0 && (
            <Typography variant="h5">Purchase</Typography>
          )}

        {shopId && renderPurchasables()}

        {shopId && Object.values(shops[shopId].items.sellable).length > 0 && (
          <Typography variant="h5">Sell</Typography>
        )}
        {shopId && renderSellables()}
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

FarmShopModal.propTypes = {};
FarmShopModal.defaultProps = {};

export default React.memo(FarmShopModal);
