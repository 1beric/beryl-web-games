import createId from "../../../util/createId";
import ACTION_TYPES from "../../actionTypes";
import actions from "..";
import selectors from "../../selectors";
import { createTileObject } from "../../../modules/farmLife/util/farmLife";
import plantpedia from "../../../modules/farmLife/util/plantpedia";

const plantActions = {
  acSetPlants: (plants) => ({
    type: ACTION_TYPES.farmLife.SET_PLANTS,
    payload: {
      plants: plants,
    },
  }),
  addPlant: (plant) => (dispatch, getState) => {
    const plants = selectors.farmLife.getPlants(getState());
    const newPlants = {
      ...plants,
    };
    newPlants[plant.id] = plant;
    dispatch(actions.farmLife.acSetPlants(newPlants));
  },
  updatePlant: (plant) => (dispatch, getState) => {
    const plants = selectors.farmLife.getPlants(getState());
    const newPlants = {
      ...plants,
    };
    newPlants[plant.id] = {
      ...plants[plant.id],
      ...plant,
    };
    dispatch(actions.farmLife.acSetPlants(newPlants));
  },
  removePlant: (plantId) => (dispatch, getState) => {
    const plants = selectors.farmLife.getPlants(getState());
    const newPlants = {
      ...plants,
    };
    delete newPlants[plantId];
    dispatch(actions.farmLife.acSetPlants(newPlants));
  },
  plantDied: (saveId, tileId, plantId) => (dispatch, getState) => {
    // need to remove plant id from tile
    const tiles = selectors.farmLife.getTiles(saveId)(getState());
    const newTiles = {
      ...tiles,
      [tileId]: createTileObject({
        ...tiles[tileId],
        id: tileId,
        plantId: null,
      }),
    };
    dispatch(actions.farmLife.acSetTiles(saveId, newTiles));
    // need to remove plant from objs
    dispatch(actions.farmLife.removePlant(plantId));
  },
};

export default plantActions;
