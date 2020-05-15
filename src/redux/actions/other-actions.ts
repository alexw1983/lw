import { LwActionTypes } from "./actionTypes";
import { IActionChart } from "../state";

export const toggleLoading = (): LwActionTypes => {
  return {
    type: "TOGGLE_LOADING",
    payload: undefined,
  };
};

export const loadActionChart = (id: string): LwActionTypes => {
  return {
    type: "LOAD_ACTION_CHART",
    payload: id,
  };
};

export const loadActionChartSuccess = (
  id: string,
  payload: IActionChart
): LwActionTypes => {
  return {
    type: "LOAD_ACTION_CHART_SUCCESS",
    payload: payload,
  };
};

export const takeDamage = (damage: number): LwActionTypes => {
  return {
    type: "TAKE_DAMAGE",
    payload: damage,
  };
};
