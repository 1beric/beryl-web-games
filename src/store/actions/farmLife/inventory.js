import createId from "../../../util/createId";
import ACTION_TYPES from "../../actionTypes";
import actions from "..";
import selectors from "../../selectors";
import { createInventoryItemObj } from "../../../modules/farmLife/util/farmLife";
import plantpedia from "../../../modules/farmLife/util/plantpedia";

const inventoryActions = {
  acSetInventory: (saveId, inventory) => ({
    type: ACTION_TYPES.farmLife.SET_INVENTORY,
    payload: {
      saveId: saveId,
      inventory: inventory,
    },
  }),
  addItemToInventory: (type, itemId) => (dispatch, getState) => {
    const saveId = selectors.farmLife.getSaveId(getState());
    const inventory = selectors.farmLife.getInventory(saveId)(getState());
    const newInventory = {
      ...inventory,
      seeds: {
        ...inventory.seeds,
      },
      plants: {
        ...inventory.plants,
      },
    };
    if (type === "BABY") {
      const inventoryItem = newInventory.seeds[itemId];
      if (inventoryItem) {
        // increase amount
        newInventory.seeds[itemId] = {
          ...inventoryItem,
          amount: inventoryItem.amount + 1,
        };
      } else {
        // create
        newInventory.seeds[itemId] = createInventoryItemObj({
          id: itemId,
        });
      }
    } else if (type === "GROWN") {
      // create
      newInventory.seeds[itemId] = createInventoryItemObj({
        id: itemId,
      });
    }

    dispatch(actions.farmLife.acSetInventory(saveId, newInventory));
  },
  removeItemFromInventory: (type, itemId) => (dispatch, getState) => {
    const saveId = selectors.farmLife.getSaveId(getState());
    const inventory = selectors.farmLife.getInventory(saveId)(getState());
    const newInventory = {
      ...inventory,
      seeds: {
        ...inventory.seeds,
      },
      plants: {
        ...inventory.plants,
      },
    };
    if (type === "BABY") {
      const inventoryItem = newInventory.seeds[itemId];
      if (inventoryItem) {
        if (inventoryItem.amount === 1) {
          // remove
          delete newInventory.seeds[itemId];
        } else {
          // decrease amount
          newInventory.seeds[itemId] = {
            ...inventoryItem,
            amount: inventoryItem.amount - 1,
          };
        }
      }
    } else if (type === "GROWN") {
      // remove
      delete newInventory.plants[itemId];
    }
    dispatch(actions.farmLife.acSetInventory(saveId, newInventory));
  },
  sellItem: (inventoryItem, shopItem) => (dispatch, getState) => {
    // need to remove plant from inventory
    dispatch(actions.farmLife.addItemToInventory("GROWN", inventoryItem.id));
    // need to remove plant from objs
    dispatch(actions.farmLife.removePlant(inventoryItem.id));
    // increase currency by price
    dispatch(actions.farmLife.adjustCurrency(shopItem.price));
  },
  buyItem: (shopItem) => (dispatch, getState) => {
    // need to add item to inventory
    dispatch(actions.farmLife.addItemToInventory("BABY", shopItem.id));
    // reduce currency by price
    dispatch(actions.farmLife.adjustCurrency(-shopItem.price));
  },
};

export default inventoryActions;
