import React, { useState } from "react";
import * as PropTypes from "prop-types";
import {
  Box,
  Button,
  ButtonGroup,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch, useSelector } from "react-redux";
import selectors from "../../../store/selectors";
import FarmLifeNoSave from "./FarmLifeNoSave";
import FarmLifeNewSave from "./FarmLifeNewSave";
import actions from "../../../store/actions";
import { Close } from "@mui/icons-material";
import FarmGrid from "./FarmGrid";
import FarmInventory from "./FarmInventory";
import shops from "../util/shops";
import FarmShopModal from "./FarmShopModal";

const FarmLife = () => {
  const theme = useTheme();

  const saveId = useSelector(selectors.farmLife.getSaveId);
  const save = useSelector(selectors.farmLife.getSave(saveId));

  const [openShop, setOpenShop] = useState(null);
  const handleCloseShop = () => setOpenShop(null);

  const dispatch = useDispatch();
  const handleExitSave = () => dispatch(actions.farmLife.exitSave());

  const createHandleShopClicked = (shopId) => () => setOpenShop(shopId);

  if (!saveId) {
    return <FarmLifeNoSave />;
  }
  if (!save) {
    return <FarmLifeNewSave id={saveId} />;
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",

          gap: theme.spacing(2),
          padding: theme.spacing(2),
          maxHeight: "-webkit-fill-available",
          minWidth: 256,
          maxWidth: `calc(100% - ${theme.spacing(2)})`,

          position: "relative",
        }}
      >
        <Typography variant="h5">Farm Life</Typography>
        <Button
          // variant="contained"
          onClick={handleExitSave}
          color="error"
          sx={{
            position: "absolute",
            top: theme.spacing(2),
            right: theme.spacing(2),
            padding: theme.spacing(0.5),
            minWidth: 0,
            minHeight: 0,
            borderRadius: "50%",
          }}
        >
          <Close />
        </Button>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Typography variant="h6">
            {save.name} ({save.currency})
          </Typography>
          <ButtonGroup variant="contained">
            {Object.values(shops).map((shop) => (
              <Button
                key={shop.id}
                variant="contained"
                onClick={createHandleShopClicked(shop.id)}
              >
                {shop.name}
              </Button>
            ))}
          </ButtonGroup>
        </Box>
        <FarmGrid saveId={saveId} />
        <FarmInventory saveId={saveId} />
        <FarmShopModal
          saveId={saveId}
          shopId={openShop}
          handleClose={handleCloseShop}
        />
      </Paper>
    </DndProvider>
  );
};

FarmLife.propTypes = {};
FarmLife.defaultProps = {};

export default React.memo(FarmLife);
