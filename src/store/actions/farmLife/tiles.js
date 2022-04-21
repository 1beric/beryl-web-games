import ACTION_TYPES from "../../actionTypes";
import createId from "../../../util/createId";
import actions from "..";
import selectors from "../../selectors";
import {
  createInventoryItemObj,
  createPlantObj,
  createTileObject,
  plantIsDead,
  plantIsGrown,
} from "../../../modules/farmLife/util/farmLife";
import accessories from "../../../modules/farmLife/util/accessories";
import plantpedia from "../../../modules/farmLife/util/plantpedia";

const tileActions = {
  acSetTiles: (saveId, tiles) => ({
    type: ACTION_TYPES.farmLife.SET_TILES,
    payload: {
      saveId: saveId,
      tiles: tiles,
    },
  }),
  addTile: (tile) => (dispatch, getState) => {
    const saveId = selectors.farmLife.getSaveId(getState());
    const tiles = selectors.farmLife.getTiles(saveId)(getState());
    const newTiles = {
      ...tiles,
    };
    newTiles[tile.id] = tile;
    dispatch(actions.farmLife.acSetTiles(saveId, newTiles));
  },
  updateTile: (tile) => (dispatch, getState) => {
    const saveId = selectors.farmLife.getSaveId(getState());
    const tiles = selectors.farmLife.getTiles(saveId)(getState());
    const newTiles = {
      ...tiles,
    };
    newTiles[tile.id] = {
      ...tiles[tile.id],
      ...tile,
    };
    dispatch(actions.farmLife.acSetTiles(saveId, newTiles));
  },
  putTile: (newTile) => (dispatch, getState) => {
    const saveId = selectors.farmLife.getSaveId(getState());
    const tiles = selectors.farmLife.getTiles(saveId)(getState());
    const tile = tiles[newTile.id];
    if (tile) {
      dispatch(actions.farmLife.updateTile(newTile));
    } else {
      dispatch(actions.farmLife.addTile(createTileObject(newTile)));
    }
  },
  removeTile: (tileId) => (dispatch, getState) => {
    const saveId = selectors.farmLife.getSaveId(getState());
    const tiles = selectors.farmLife.getTiles(saveId)(getState());
    const newTiles = {
      ...tiles,
    };
    delete newTiles[tileId];
    dispatch(actions.farmLife.acSetTiles(saveId, newTiles));
  },
  itemDroppedOnCell: (tileId, item) => (dispatch, getState) => {
    switch (item.type) {
      case accessories.WATER.id:
        dispatch(actions.farmLife.waterTile(tileId));
        break;
      case accessories.SCYTHE.id:
        dispatch(actions.farmLife.harvestTile(tileId));
        break;
      case "BABY":
        dispatch(actions.farmLife.plantBaby(tileId, item.id));
        break;
      default:
        break;
    }
  },
  waterTile: (tileId) => (dispatch, getState) => {
    dispatch(
      actions.farmLife.putTile({
        id: tileId,
        watered: new Date().valueOf(),
      })
    );
  },
  harvestTile: (tileId) => (dispatch, getState) => {
    const saveId = selectors.farmLife.getSaveId(getState());
    const tiles = selectors.farmLife.getTiles(saveId)(getState());
    const tile = tiles[tileId];
    if (!tile) return;
    const plants = selectors.farmLife.getPlants(getState());
    const plant = plants[tile.plantId];
    if (!plant) return;

    const grown = plantIsGrown(plant);
    const dead = plantIsDead(plant, { watered: tile.watered });

    if (grown && !dead) {
      // remove plant from tile
      dispatch(
        actions.farmLife.updateTile({
          id: tileId,
          plantId: null,
        })
      );
      // add harvested plant to inventory
      dispatch(actions.farmLife.addItemToInventory("GROWN", plant.id));
      // update plant with harvested time
      dispatch(
        actions.farmLife.updatePlant({
          id: plant.id,
          harvested: new Date().valueOf(),
        })
      );
    }
    if (dead) {
      // remove plant from tile
      dispatch(
        actions.farmLife.updateTile({
          id: tileId,
          plantId: null,
        })
      );
      // remove plant from obj
      dispatch(actions.farmLife.removePlant(plant.id));
    }
  },
  plantBaby: (tileId, plantType) => (dispatch, getState) => {
    const saveId = selectors.farmLife.getSaveId(getState());
    const tiles = selectors.farmLife.getTiles(saveId)(getState());
    const tile = tiles[tileId];

    if (tile && tile.plantId) return;

    // remove seed from inventory
    dispatch(actions.farmLife.removeItemFromInventory("BABY", plantType));

    // add plant to obj
    const newPlantId = createId();
    dispatch(
      actions.farmLife.addPlant(
        createPlantObj({
          id: newPlantId,
          type: plantType,
        })
      )
    );

    // add or update (put) tile with new plant id
    dispatch(
      actions.farmLife.putTile({
        id: tileId,
        plantId: newPlantId,
      })
    );
  },
};

export default tileActions;
