import { LwActionTypes } from "../actions/actionTypes";

const showNewPlayerFormReducer = (
  state: boolean = false,
  action: LwActionTypes
) => {
  switch (action.type) {
    case "SAVE_PLAYER_SUCCESS":
      return false;
    case "TOGGLE_NEW_PLAYER_FORM":
      return !state;
    default:
      return state;
  }
};

export default showNewPlayerFormReducer;
