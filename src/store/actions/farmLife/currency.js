import ACTION_TYPES from "../../actionTypes";
import selectors from "../../selectors";
import actions from "..";

const currencyActions = {
  acSetCurrency: (saveId, currency) => ({
    type: ACTION_TYPES.farmLife.SET_CURRENCY,
    payload: {
      saveId: saveId,
      currency: currency,
    },
  }),
  adjustCurrency: (additive) => (dispatch, getState) => {
    const saveId = selectors.farmLife.getSaveId(getState());
    const currency = selectors.farmLife.getCurrency(saveId)(getState());
    dispatch(actions.farmLife.acSetCurrency(saveId, currency + additive));
  },
};

export default currencyActions;
