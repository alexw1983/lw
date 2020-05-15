import { LwActionTypes } from "../actions/actionTypes";
import { IPlayer } from "../state";

const playersReducer = (state: IPlayer[] = [], action: LwActionTypes) => {
  switch (action.type) {
    case "REQUEST_PLAYERS":
      return Object.assign([], state, action.payload);
    case "RECEIVE_PLAYERS":
      return Object.assign([], state, action.payload);
    default:
      return state;
  }
};

export default playersReducer;
