import { LwActionTypes } from "../actions/actionTypes";
import { IPlayer } from "../types";

const playersReducer = (state: IPlayer[] = [], action: LwActionTypes) => {
  switch (action.type) {
    case "REQUEST_PLAYERS":
      return [];
    case "RECEIVE_PLAYERS":
      return Object.assign([], state, [...action.payload]);
    case "SAVE_PLAYER_SUCCESS":
      if (state.find(x => x.id === action.payload.id)) {
        const newState = state.reduce((acc, curr) => {
          if (curr.id === action.payload.id) {
            return [...acc, action.payload];
          } else {
            return [...acc, curr];
          }
        }, []);

        return newState;
      }

      return [...state, action.payload];
    default:
      return state;
  }
};

export default playersReducer;
