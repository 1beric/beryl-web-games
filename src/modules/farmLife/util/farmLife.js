import { hours, minutes } from "../../../util/time";
import accessories from "./accessories";
import plantpedia from "./plantpedia";

const DEFAULT = "DEFAULT";

export const createTileObject = (tile) => ({
  id: DEFAULT,
  watered: 0,
  plantId: null,
  ...tile,
});

export const createPlantObj = (plant) => ({
  id: DEFAULT,
  type: DEFAULT,
  planted: new Date().valueOf(),
  ...plant,
});

export const createInventoryItemObj = (item) => ({
  id: DEFAULT,
  amount: 1,
  ...item,
});

const DEFAULT_INVENTORY = {
  accessories: {
    [accessories.WATER.id]: createInventoryItemObj({
      id: accessories.WATER.id,
    }),
    [accessories.SCYTHE.id]: createInventoryItemObj({
      id: accessories.SCYTHE.id,
    }),
  },
  seeds: {
    [plantpedia.ELM.id]: createInventoryItemObj({
      id: plantpedia.ELM.id,
      amount: 2,
    }),
    [plantpedia.TOMATO.id]: createInventoryItemObj({
      id: plantpedia.TOMATO.id,
      amount: 5,
    }),
  },
  plants: {},
};

const DEFAULT_SAVE = {
  id: DEFAULT,
  name: DEFAULT,
  size: 10,
  currency: 1000,
  tiles: {},
  inventory: DEFAULT_INVENTORY,
};

export const createSaveObject = (save) => ({
  ...DEFAULT_SAVE,
  ...save,
});

export const GRID_INDEX_SEPARATOR = " | ";
export const getTileId = (x, y) => `${x}${GRID_INDEX_SEPARATOR}${y}`;

export const WATER_TIME = hours(24);

export const plantIsDead = (plant, { watered, harvested }) => {
  const tooLongWithoutWater =
    new Date().valueOf() - watered >
    WATER_TIME + plantpedia[plant.type].timeLivableWithoutWater;
  const plantedLongEnough =
    new Date().valueOf() - plant.planted >
    plantpedia[plant.type].timeLivableWithoutWater;
  const diedInInventory =
    harvested &&
    new Date().valueOf() - harvested >
      plantpedia[plant.type].timeLiveableInInventory;
  return (tooLongWithoutWater && plantedLongEnough) || diedInInventory;
};

export const plantIsGrown = (plant) =>
  new Date().valueOf() - plant.planted > plantpedia[plant.type].fullyGrownAge;
