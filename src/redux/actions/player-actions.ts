import { IPlayer, ILwState } from "../state";
import { getPlayers } from "../api/api";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { Action } from "redux";
import { LwActionTypes } from "./actionTypes";

export const requestPlayers = (): LwActionTypes => {
  return {
    type: "REQUEST_PLAYERS",
    payload: {},
  };
};

export const receivePlayers = (players: IPlayer[]): LwActionTypes => {
  return {
    type: "RECEIVE_PLAYERS",
    payload: players,
  };
};

export const fetchPlayers = (): ThunkAction<
  void,
  ILwState,
  unknown,
  Action<string>
> => async (dispatch: ThunkDispatch<ILwState, unknown, LwActionTypes>) => {
  dispatch(requestPlayers());

  getPlayers()
    .then(
      (response) => response.json,
      (error) => {
        console.log("An error occurred.", error);
        return [] as IPlayer[];
      }
    )
    .then((players) => {
      console.log("GOT HERE 3");
      dispatch(receivePlayers(players));
    });
};
