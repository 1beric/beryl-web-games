import seeds from "./seeds";
import saplings from "./saplings";
import farmersMarket from "./farmersMarket";

const shops = {
  SEEDS: {
    id: "SEEDS",
    name: "Sally's Seeds",
    items: seeds,
  },
  SAPLINGS: {
    id: "SAPLINGS",
    name: "Samantha's Saplings",
    items: saplings,
  },
  FARMERS_MARKET: {
    id: "FARMERS_MARKET",
    name: "Farmer's Market",
    items: farmersMarket,
  },
};

export default shops;
