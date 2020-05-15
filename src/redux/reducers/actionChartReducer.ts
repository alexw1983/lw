import { ILwAction, LW_ACTION_TYPE } from "../actionTypes";
import { IActionChart } from "../state";

const { LOAD_ACTION_CHART_SUCCESS, TAKE_DAMAGE } = LW_ACTION_TYPE;

const initalState: IActionChart = {
  combatSkill: 25,
  endurancePoints: 30,
  kaiDiscipines: [
    { name: "Healing", description: "" },
    { name: "Sixth Sense", description: "" },
    { name: "Mind Blast", description: "" },
    { name: "Weapon Skill", description: "" },
    { name: "Hunting", description: "" }
  ],
  backpack: [],
  beltPouch: 10,
  weapons: ["Sword", "dagger"],
  specialItems: [],
};

const actionChartReducer = (
  state: IActionChart = initalState,
  action: ILwAction
) => {
  switch (action.type) {
    case TAKE_DAMAGE:
      return Object.assign({}, state, {
        ...state,
        endurancePoints: state.endurancePoints - action.payload.damage,
      });

    case LOAD_ACTION_CHART_SUCCESS:
      return Object.assign({}, state, action.payload);

    default:
      return state;
  }
};

export default actionChartReducer;
