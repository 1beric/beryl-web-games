import initialState from "../state/initialState";
import farmLifeReducer from "./farmLife";

const reducer = (state = initialState, action) => {
  if (!action) return state;

  const { type } = action;
  if (!type) return state;

  if (farmLifeReducer[type]) {
    return farmLifeReducer[type](state, action);
  }

  return state;
};

export default reducer;
