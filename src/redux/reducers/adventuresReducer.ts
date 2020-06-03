import { IAdventure, IActionChart } from "../types";
import { LwActionTypes } from "../actions/actionTypes";

const _match = (a: IAdventure, b: IAdventure) => {
  return a.playerId === b.playerId && a.bookNumber === b.bookNumber;
};

const _reduce = (state: IAdventure[], payload: IAdventure) => {
  return state.reduce((acc, curr) => {
    if (_match(curr, payload)) {
      return [...acc];
    } else {
      return [...acc, curr];
    }
  }, []);
};

const adventuresReducer = (state: IAdventure[] = [], action: LwActionTypes) => {
  const current = state.find((x) => _match(x, action.payload));

  switch (action.type) {
    case "REQUEST_ADVENTURES":
      return [];

    case "RECEIVE_ADVENTURES":
      return Object.assign([], state, [...action.payload]);

    case "REMOVE_ADVENTURE_SUCCESS":
      return Object.assign([], state, _reduce(state, action.payload));

    case "SAVE_ADVENTURE_SUCCESS":
      if (current) {
        return Object.assign([], state, _reduce(state, action.payload));
      }

      return [...state, action.payload];

    case "TAKE_DAMAGE_SUCCESS":
      if (current) {
        current.actionChart.currentEndurancePoints =
          current.actionChart.currentEndurancePoints - action.payload.damage;

        return Object.assign([], state, _reduce(state, action.payload));
      }

      return state;

    case "SUCCESS_SPEND_MONEY":
      if (current) {
        current.actionChart.beltPouch =
          current.actionChart.beltPouch - action.payload.cost;

        return Object.assign([], state, _reduce(state, action.payload));
      }

      return state;

    case "REMOVE_EQUIPMENT_SUCCESS":
      if (current && current.actionChart) {
        current.actionChart.equipment = current.actionChart.equipment.filter(
          (x) => x.id !== action.payload.equipment.id
        );

        return Object.assign([], state, _reduce(state, action.payload));
      }

      return state;

    default:
      return state;
  }
};

export default adventuresReducer;
