import { days } from "../../../util/time";
import _ from "lodash";

const createPlant = (
  id,
  timeLivableWithoutWater,
  timeLiveableInInventory,
  fullyGrownAge,
  babyName,
  grownName
) => ({
  id: id,
  timeLivableWithoutWater: timeLivableWithoutWater,
  timeLiveableInInventory: timeLiveableInInventory,
  fullyGrownAge: fullyGrownAge,
  babyName: babyName,
  grownName: grownName,
});

const trees = {
  ELM: createPlant("ELM", days(4), days(12), days(20), "Elm Sapling", "Elm"),
  OAK: createPlant("OAK", days(5), days(14), days(25), "Oak Sapling", "Oak"),
  WILLOW: createPlant(
    "WILLOW",
    days(3),
    days(10),
    days(16),
    "Willow Sapling",
    "Willow"
  ),
};
const vegetables = {
  TOMATO: createPlant(
    "TOMATO",
    days(1),
    days(5),
    days(4),
    "Tomato Seeds",
    "Tomato"
  ),
  CUCUMBER: createPlant(
    "CUCUMBER",
    days(1),
    days(8),
    days(6),
    "Cucumber Seeds",
    "Cucumber"
  ),
  LETTUCE: createPlant(
    "LETTUCE",
    days(1),
    days(3),
    days(3),
    "Lettuce Starter",
    "Lettuce"
  ),
  BROCCOLI: createPlant(
    "BROCCOLI",
    days(2),
    days(6),
    days(5),
    "Broccoli Starter",
    "Broccoli"
  ),
};
const fruits = {
  WATERMELON: createPlant(
    "WATERMELON",
    days(3),
    days(12),
    days(14),
    "Watermelon Seeds",
    "Watermelon"
  ),
};
const flowers = {
  CACTUS: createPlant(
    "CACTUS",
    days(5),
    days(20),
    days(30),
    "Cactus Starter",
    "Bloomed Cactus"
  ),
  ROSE: createPlant("ROSE", days(2), days(8), days(6), "Rose Stem", "Rose"),
  AZAELIA: createPlant(
    "AZAELIA",
    days(2),
    days(7),
    days(5),
    "Azaelia Seeds",
    "Azaelia"
  ),
};

const plantpedia = {
  ...trees,
  ...vegetables,
  ...fruits,
  ...flowers,
};

export default plantpedia;
