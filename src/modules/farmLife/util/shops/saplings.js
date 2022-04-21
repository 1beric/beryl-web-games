import plantpedia from "../plantpedia";

const saplings = {
  purchasable: {
    [plantpedia.ELM.id]: {
      id: plantpedia.ELM.id,
      price: 800,
    },
    [plantpedia.OAK.id]: {
      id: plantpedia.OAK.id,
      price: 1000,
    },
    [plantpedia.WILLOW.id]: {
      id: plantpedia.WILLOW.id,
      price: 700,
    },
    [plantpedia.CACTUS.id]: {
      id: plantpedia.CACTUS.id,
      price: 600,
    },
  },
  sellable: {},
};

export default saplings;
