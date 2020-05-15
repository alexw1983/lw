import { LW_ACTION_TYPE, ILwAction } from "./actionTypes";
import { IActionChart } from "./state";

export const toggleLoading = (): ILwAction => {
  return {
    type: LW_ACTION_TYPE.TOGGLE_LOADING,
    payload: undefined,
  };
};

export const loadActionChart = (id: string): ILwAction => {
  return {
    type: LW_ACTION_TYPE.LOAD_ACTION_CHART,
    payload: {
      characterId: id,
    },
  };
};

export const loadActionChartSuccess = (
  id: string,
  payload: IActionChart
): ILwAction => {
  return {
    type: LW_ACTION_TYPE.LOAD_ACTION_CHART_SUCCESS,
    payload: payload,
  };
};

export const takeDamage = (damage: number): ILwAction => {
  return {
    type: LW_ACTION_TYPE.TAKE_DAMAGE,
    payload: {
      damage: damage,
    },
  };
};
