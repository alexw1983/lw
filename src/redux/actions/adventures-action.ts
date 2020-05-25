import { IAdventure, IPlayer, ILwState } from "../state";
import { LwActionTypes, LwThunkAction, LwTHunkDispatch } from "./actionTypes";
import { upsertAdventure, getAdventures } from "../../data/api";

export const saveAdventureSuccess = (adventure: IAdventure): LwActionTypes => {
  return {
    type: "SAVE_ADVENTURE_SUCCESS",
    payload: adventure,
  };
};

export const requestSaveAdventure = (): LwActionTypes => {
  return {
    type: "REQUEST_SAVE_ADVENTURE",
    payload: {},
  };
};

export const saveAdventure = (adventure: IAdventure): LwThunkAction => async (
  dispatch: LwTHunkDispatch
) => {
  dispatch(requestSaveAdventure());

  upsertAdventure(adventure)
    .then(
      (response) => response,
      (error) => {
        console.log("An error occurred.", error);
        return [] as IPlayer[];
      }
    )
    .then(() => {
      dispatch(saveAdventureSuccess(adventure));
    });
};

export const requestAdventures = (): LwActionTypes => {
  return {
    type: "REQUEST_ADVENTURES",
    payload: {},
  };
};

export const receiveAdventures = (adventures: IPlayer[]): LwActionTypes => {
  return {
    type: "RECEIVE_ADVENTURES",
    payload: adventures,
  };
};

export const fetchAdventures = (): LwThunkAction => async (
  dispatch: LwTHunkDispatch
) => {
  dispatch(requestAdventures());

  getAdventures()
    .then(
      (response) => response.json,
      (error) => {
        console.log("An error occurred.", error);
        return [] as IPlayer[];
      }
    )
    .then((adventures) => {
      dispatch(receiveAdventures(adventures));
    });
};

export const fetchAdventuresIfNeeded = (): LwThunkAction => async (
  dispatch: LwTHunkDispatch,
  getState: () => ILwState
) => {
  if (getState().adventures.length === 0) {
    return dispatch(fetchAdventures());
  } else {
    return Promise.resolve();
  }
};
