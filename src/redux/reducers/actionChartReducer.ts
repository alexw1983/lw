import { LwActionTypes } from "../actions/actionTypes";
import { IActionChart } from "../types";

const actionChartReducer = (
  state: IActionChart = {} as IActionChart,
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
