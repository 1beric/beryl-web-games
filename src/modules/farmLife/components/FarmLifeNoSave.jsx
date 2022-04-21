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
import ROUTE_ELEMENTS from "../../body/util/routeElements";
import { useDispatch, useSelector } from "react-redux";
import selectors from "../../../store/selectors";
import actions from "../../../store/actions";

const FarmLifeNoSave = () => {
  const theme = useTheme();

  const saves = useSelector(selectors.farmLife.getSaves);

  const dispatch = useDispatch();

  const handleNewGameClicked = () => dispatch(actions.farmLife.createNewSave());
  const createHandleLoadSaveClicked = (saveId) => () =>
    dispatch(actions.farmLife.loadSave(saveId));

  const renderLoadGame = () => (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: theme.spacing(4),
        maxHeight: "-webkit-fill-available",
      }}
    >
      <Typography variant="h5">Load Save</Typography>
      <ButtonGroup variant="contained">
        {Object.values(saves).map((save) => (
          <Button
            key={save.id}
            variant="contained"
            onClick={createHandleLoadSaveClicked(save.id)}
          >
            {save.name}
          </Button>
        ))}
      </ButtonGroup>
    </Box>
  );

  const renderNewGame = () => (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: theme.spacing(4),
        maxHeight: "-webkit-fill-available",
      }}
    >
      <Typography variant="h5">New Game</Typography>
      <Button variant="contained" onClick={handleNewGameClicked}>
        Create
      </Button>
    </Box>
  );

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",

        gap: theme.spacing(2),
        padding: theme.spacing(2),
        maxHeight: "-webkit-fill-available",
      }}
    >
      <Typography variant="h5">Farm Life</Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          justifyContent: "center",
          gap: theme.spacing(1),
        }}
      >
        {Object.values(saves).length > 0 && renderLoadGame()}
        {renderNewGame()}
      </Box>
    </Paper>
  );
};

FarmLifeNoSave.propTypes = {};
FarmLifeNoSave.defaultProps = {};

export default React.memo(FarmLifeNoSave);
