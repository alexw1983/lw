import { IPlayer, ILwState } from "../types";
import { getPlayers, upsertPlayer } from "../../data/api";
import { LwActionTypes, LwThunkAction, LwTHunkDispatch } from "./actionTypes";

export const toggleNewPlayerForm = (): LwActionTypes => {
  return {
    type: "TOGGLE_NEW_PLAYER_FORM",
    payload: {},
  };
};

export const requestSavePlayer = (): LwActionTypes => {
  return {
    type: "REQUEST_SAVE_PLAYERS",
    payload: {},
  };
};


export const savePlayerSuccess = (player: IPlayer): LwActionTypes => {
  return {
    type: "SAVE_PLAYER_SUCCESS",
    payload: player,
  };
};

export const savePlayer = (player: IPlayer): LwThunkAction => async (
  dispatch: LwTHunkDispatch
) => {
  dispatch(requestSavePlayer());

  upsertPlayer(player)
    .then(
      (response) => response,
      (error) => {
        console.log("An error occurred.", error);
        return [] as IPlayer[];
      }
    )
    .then(() => {
      dispatch(savePlayerSuccess(player));
    });
};

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

export const fetchPlayers = (): LwThunkAction => async (
  dispatch: LwTHunkDispatch
) => {
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
      dispatch(receivePlayers(players));
    });
};

export const fetchPlayersIfNeeded = (): LwThunkAction => async (
  dispatch: LwTHunkDispatch,
  getState: () => ILwState
) => {
  if (getState().players.length === 0) {
    return dispatch(fetchPlayers());
  } else {
    return Promise.resolve();
  }
};
