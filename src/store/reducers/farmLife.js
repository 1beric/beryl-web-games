import ACTION_TYPES from "../actionTypes";

const farmLifeReducer = {
  [ACTION_TYPES.farmLife.SET_SAVE_ID]: (state, action) => ({
    ...state,
    farmLife: {
      ...state.farmLife,
      saveId: action.payload.saveId,
    },
  }),
  [ACTION_TYPES.farmLife.SET_SAVES]: (state, action) => ({
    ...state,
    farmLife: {
      ...state.farmLife,
      saves: action.payload.saves,
    },
  }),
  [ACTION_TYPES.farmLife.SET_PLANTS]: (state, action) => ({
    ...state,
    farmLife: {
      ...state.farmLife,
      plants: action.payload.plants,
    },
  }),
  [ACTION_TYPES.farmLife.SET_INVENTORY]: (state, action) => ({
    ...state,
    farmLife: {
      ...state.farmLife,
      saves: {
        ...state.farmLife.saves,
        [action.payload.saveId]: {
          ...state.farmLife.saves[action.payload.saveId],
          inventory: action.payload.inventory,
        },
      },
    },
  }),
  [ACTION_TYPES.farmLife.SET_CURRENCY]: (state, action) => ({
    ...state,
    farmLife: {
      ...state.farmLife,
      saves: {
        ...state.farmLife.saves,
        [action.payload.saveId]: {
          ...state.farmLife.saves[action.payload.saveId],
          currency: action.payload.currency,
        },
      },
    },
  }),
  [ACTION_TYPES.farmLife.SET_TILES]: (state, action) => ({
    ...state,
    farmLife: {
      ...state.farmLife,
      saves: {
        ...state.farmLife.saves,
        [action.payload.saveId]: {
          ...state.farmLife.saves[action.payload.saveId],
          tiles: action.payload.tiles,
        },
      },
    },
  }),
};

export default farmLifeReducer;
