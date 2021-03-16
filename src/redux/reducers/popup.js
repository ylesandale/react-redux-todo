import * as types from "../constants";

const initialState = { visiblePopup: false };

const popup = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_VISIBLE_POPUP:
      return { visiblePopup: !state.visiblePopup };

    default:
      return state;
  }
};

export default popup;
