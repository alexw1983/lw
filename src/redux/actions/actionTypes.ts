import { IPlayer, IActionChart } from "../state";

export type LW_ACTION_TYPE =
  | "LOAD_ACTION_CHART"
  | "LOAD_ACTION_CHART_SUCCESS"
  | "TAKE_DAMAGE"
  | "TOGGLE_LOADING"
  | "REQUEST_PLAYERS"
  | "RECEIVE_PLAYERS"
  | "LOAD_PLAYERS_FAIL";

interface ILwAction {
  type: LW_ACTION_TYPE;
  payload: any;
}

interface IFetchPlayerAction extends ILwAction {}

interface ILoadingAction extends ILwAction {
  payload: boolean;
}

interface IReceivePlayerAction extends ILwAction {
  payload: IPlayer[];
}

interface ILoadActionChartAction extends ILwAction {
  payload: string;
}

interface ILoadActionChartSuccessAction extends ILwAction {
  payload: IActionChart;
}

interface ITakeDamageAction extends ILwAction {
  payload: number;
}

export type LwActionTypes =
  | IFetchPlayerAction
  | ILoadingAction
  | IReceivePlayerAction
  | ILoadActionChartAction
  | ILoadActionChartSuccessAction
  | ITakeDamageAction;
