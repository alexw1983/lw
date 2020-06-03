import { LwActionTypes } from "../actions/actionTypes";

const loadingReducer = (state: boolean = false, action: LwActionTypes) => {
  switch (action.type) {
    case "TOGGLE_LOADING":
      return !state;
    case "LOAD_ACTION_CHART":
    case "REQUEST_PLAYERS":
    case "REQUEST_SAVE_PLAYERS":
    case "REQUEST_TAKE_DAMAGE":
      return true;
    case "LOAD_ACTION_CHART_SUCCESS":
    case "SAVE_PLAYER_SUCCESS":
    case "RECEIVE_PLAYERS":
    case "LOAD_PLAYERS_FAIL":
    case "TAKE_DAMAGE":
    case "TAKE_DAMAGE_SUCCESS":
      return false;
    default:
      return state;
  }
};

export default loadingReducer;
