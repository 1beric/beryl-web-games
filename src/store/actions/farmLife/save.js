import createId from "../../../util/createId";
import ACTION_TYPES from "../../actionTypes";
import actions from ".././";
import selectors from "../../selectors";
import { createSaveObject } from "../../../modules/farmLife/util/farmLife";

const saveActions = {
  acSetSaveId: (saveId) => ({
    type: ACTION_TYPES.farmLife.SET_SAVE_ID,
    payload: {
      saveId: saveId,
    },
  }),
  acSetSaves: (saves) => ({
    type: ACTION_TYPES.farmLife.SET_SAVES,
    payload: {
      saves: saves,
    },
  }),
  createNewSave: () => (dispatch, getState) => {
    const newId = createId();
    dispatch(actions.farmLife.acSetSaveId(newId));
  },
  confirmCreateNewSave: (id, name) => (dispatch, getState) => {
    const saves = selectors.farmLife.getSaves(getState());
    const newSaves = {
      ...saves,
      [id]: createSaveObject({
        id: id,
        name: name,
      }),
    };
    dispatch(actions.farmLife.acSetSaves(newSaves));
  },
  loadSave: (saveId) => (dispatch, getState) => {
    dispatch(actions.farmLife.acSetSaveId(saveId));
  },
  exitSave: () => (dispatch, getState) => {
    dispatch(actions.farmLife.acSetSaveId(null));
  },
};

export default saveActions;
