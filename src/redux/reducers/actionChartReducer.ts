import { LwActionTypes } from "../actions/actionTypes";
import { IActionChart } from "../state";

const initalState: IActionChart = {
  combatSkill: 25,
  endurancePoints: 30,
  kaiDiscipines: [
    { name: "Healing", description: "" },
    { name: "Sixth Sense", description: "" },
    { name: "Mind Blast", description: "" },
    { name: "Weapon Skill", description: "" },
    { name: "Hunting", description: "" },
  ],
  backpack: [],
  beltPouch: 10,
  weapons: ["Sword", "dagger"],
  specialItems: [],
};

const actionChartReducer = (
  state: IActionChart = initalState,
  action: LwActionTypes
) => {
  switch (action.type) {
    case "TAKE_DAMAGE":
      return Object.assign({}, state, {
        ...state,
        endurancePoints: state.endurancePoints - action.payload,
      });

    case "LOAD_ACTION_CHART_SUCCESS":
      return Object.assign({}, state, action.payload);

    default:
      return state;
  }
};

export default actionChartReducer;
