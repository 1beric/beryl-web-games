import React, { useState } from "react";
import * as PropTypes from "prop-types";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import ROUTE_ELEMENTS from "../../body/util/routeElements";
import { useDispatch, useSelector } from "react-redux";
import selectors from "../../../store/selectors";
import actions from "../../../store/actions";

const FarmLifeNewSave = ({ id }) => {
  const theme = useTheme();

  const [name, setName] = useState("");
  const handleNameChange = (event) => setName(event.target.value);

  const dispatch = useDispatch();

  const handleSubmitClicked = () =>
    dispatch(actions.farmLife.confirmCreateNewSave(id, name));

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",

        gap: theme.spacing(1),
        padding: theme.spacing(2),
        maxHeight: "-webkit-fill-available",
      }}
    >
      <Typography variant="h5">Farm Life</Typography>
      <Paper
        elevation={2}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: theme.spacing(1),
          padding: theme.spacing(2),
          maxHeight: "-webkit-fill-available",
        }}
      >
        <Typography variant="h6">New Game</Typography>
        <TextField
          variant="outlined"
          placeholder="New Game"
          size="small"
          label="Name"
          type="text"
          value={name}
          onChange={handleNameChange}
        />
        <Button
          variant="contained"
          onClick={handleSubmitClicked}
          disabled={name.length === 0}
          sx={{ alignSelf: "end" }}
        >
          Submit
        </Button>
      </Paper>
    </Paper>
  );
};

FarmLifeNewSave.propTypes = {};
FarmLifeNewSave.defaultProps = {};

export default React.memo(FarmLifeNewSave);
