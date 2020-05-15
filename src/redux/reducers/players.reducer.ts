import { LwActionTypes } from "../actions/actionTypes";
import { IPlayer } from "../state";

const playersReducer = (state: IPlayer[] = [], action: LwActionTypes) => {
  switch (action.type) {
    case "REQUEST_PLAYERS":
      return [];
    case "RECEIVE_PLAYERS":
      return Object.assign([], state, [...action.payload]);
    case "SAVE_PLAYER_SUCCESS":
      return Object.assign([], state, [...state, action.payload]);
    default:
      return state;
  }
};

export default playersReducer;
