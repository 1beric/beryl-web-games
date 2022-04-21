import { createSelector } from "reselect";
import selectors from ".";

const farmLifeSelectors = {
  getSaveId: createSelector(
    [(state) => state.farmLife.saveId],
    (saveId) => saveId
  ),
  getSaves: createSelector([(state) => state.farmLife.saves], (saves) => saves),
  getPlants: createSelector(
    [(state) => state.farmLife.plants],
    (plants) => plants
  ),
  getSave: (id) =>
    createSelector([(state) => state.farmLife.saves], (saves) => saves[id]),
  getTiles: (id) =>
    createSelector(
      [(state) => state.farmLife.saves],
      (saves) => saves[id].tiles
    ),
  getSize: (id) =>
    createSelector(
      [(state) => state.farmLife.saves],
      (saves) => saves[id].size
    ),
  getInventory: (id) =>
    createSelector(
      [(state) => state.farmLife.saves],
      (saves) => saves[id].inventory
    ),
  getCurrency: (id) =>
    createSelector(
      [(state) => state.farmLife.saves],
      (saves) => saves[id].currency
    ),
};

export default farmLifeSelectors;
