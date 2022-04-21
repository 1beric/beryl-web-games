import plantpedia from "../plantpedia";

const farmersMarket = {
  purchasable: {},
  sellable: {
    [plantpedia.TOMATO.id]: {
      id: plantpedia.TOMATO.id,
      price: 400,
    },
    [plantpedia.BROCCOLI.id]: {
      id: plantpedia.BROCCOLI.id,
      price: 450,
    },
    [plantpedia.CUCUMBER.id]: {
      id: plantpedia.CUCUMBER.id,
      price: 625,
    },
    [plantpedia.LETTUCE.id]: {
      id: plantpedia.LETTUCE.id,
      price: 165,
    },
    [plantpedia.WATERMELON.id]: {
      id: plantpedia.WATERMELON.id,
      price: 1230,
    },
    [plantpedia.ROSE.id]: {
      id: plantpedia.ROSE.id,
      price: 215,
    },
    [plantpedia.AZAELIA.id]: {
      id: plantpedia.AZAELIA.id,
      price: 195,
    },
    [plantpedia.ELM.id]: {
      id: plantpedia.ELM.id,
      price: 8000,
    },
    [plantpedia.OAK.id]: {
      id: plantpedia.OAK.id,
      price: 9000,
    },
    [plantpedia.WILLOW.id]: {
      id: plantpedia.WILLOW.id,
      price: 6500,
    },
    [plantpedia.CACTUS.id]: {
      id: plantpedia.CACTUS.id,
      price: 4000,
    },
  },
};

export default farmersMarket;
