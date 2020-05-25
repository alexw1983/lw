import { IPlayer, IActionChart, IAdventure, ILwState } from "../state";
import { ThunkAction, ThunkDispatch } from "redux-thunk";

export type LW_ACTION_TYPE =
  | "LOAD_ACTION_CHART"
  | "LOAD_ACTION_CHART_SUCCESS"
  | "TAKE_DAMAGE"
  | "TOGGLE_LOADING"
  | "REQUEST_PLAYERS"
  | "RECEIVE_PLAYERS"
  | "LOAD_PLAYERS_FAIL"
  | "REQUEST_SAVE_PLAYERS"
  | "SAVE_PLAYER"
  | "SAVE_PLAYER_SUCCESS"
  | "TOGGLE_NEW_PLAYER_FORM"
  | "REQUEST_ADVENTURES"
  | "RECEIVE_ADVENTURES"
  | "REQUEST_SAVE_ADVENTURE"
  | "SAVE_ADVENTURE_SUCCESS";

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

interface ISavePlayerAction extends ILwAction {
  payload: IPlayer;
}

interface ISaveAdventureAction extends ILwAction {
  payload: IAdventure;
}

interface IReceiveAdvenruesAction extends ILwAction {
  payload: IAdventure[];
}

export type LwActionTypes =
  | IFetchPlayerAction
  | ILoadingAction
  | IReceivePlayerAction
  | ILoadActionChartAction
  | ILoadActionChartSuccessAction
  | ITakeDamageAction
  | ISavePlayerAction
  | ISaveAdventureAction
  | IReceiveAdvenruesAction;

export type LwThunkAction = ThunkAction<void, ILwState, unknown, LwActionTypes>;
export type LwTHunkDispatch = ThunkDispatch<ILwState, unknown, LwActionTypes>;
