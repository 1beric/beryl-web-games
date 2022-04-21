import plantpedia from "../plantpedia";

const seeds = {
  purchasable: {
    [plantpedia.TOMATO.id]: {
      id: plantpedia.TOMATO.id,
      price: 135,
    },
    [plantpedia.BROCCOLI.id]: {
      id: plantpedia.BROCCOLI.id,
      price: 200,
    },
    [plantpedia.CUCUMBER.id]: {
      id: plantpedia.CUCUMBER.id,
      price: 275,
    },
    [plantpedia.LETTUCE.id]: {
      id: plantpedia.LETTUCE.id,
      price: 105,
    },
    [plantpedia.WATERMELON.id]: {
      id: plantpedia.WATERMELON.id,
      price: 340,
    },
    [plantpedia.ROSE.id]: {
      id: plantpedia.ROSE.id,
      price: 165,
    },
    [plantpedia.AZAELIA.id]: {
      id: plantpedia.AZAELIA.id,
      price: 145,
    },
  },
  sellable: {},
};

export default seeds;
