import { IAdventure } from "../state";
import { LwActionTypes } from "../actions/actionTypes";

const adventuresReducer = (state: IAdventure[] = [], action: LwActionTypes) => {
  switch (action.type) {
    case "REQUEST_ADVENTURES":
      return [];
    case "RECEIVE_ADVENTURES":
      return Object.assign([], state, [...action.payload]);
    case "REMOVE_ADVENTURE_SUCCESS":
      const newState = state.reduce((acc, curr) => {
        if (
          curr.playerId === action.payload.playerId &&
          curr.bookNumber === action.payload.bookNumber
        ) {
          return [...acc];
        } else {
          return [...acc, curr];
        }
      }, []);

      return newState;

    case "SAVE_ADVENTURE_SUCCESS":
      if (
        state.find(
          (x) =>
            x.playerId === action.payload.playerId &&
            x.bookNumber === action.payload.bookNumber
        )
      ) {
        const newState = state.reduce((acc, curr) => {
          if (
            curr.playerId === action.payload.playerId &&
            curr.bookNumber === action.payload.bookNumber
          ) {
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

export default adventuresReducer;
