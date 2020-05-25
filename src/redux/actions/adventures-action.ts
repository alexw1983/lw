import { IAdventure, IPlayer, ILwState } from "../state";
import { LwActionTypes, LwThunkAction, LwTHunkDispatch } from "./actionTypes";
import {
  upsertAdventure,
  getAdventures,
  deleteAdventure,
} from "../../data/api";

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
      (error) => handleError(error, [] as IPlayer[])
    )
    .then(() => {
      dispatch(saveAdventureSuccess(adventure));
    });
};

export const requestRemoveAdventure = (): LwActionTypes => {
  return {
    type: "REQUEST_REMOVE_ADVENTURE",
    payload: {},
  };
};

export const removeAdventureSuccess = (
  adventure: IAdventure
): LwActionTypes => {
  return {
    type: "REMOVE_ADVENTURE_SUCCESS",
    payload: adventure,
  };
};

export const removeAdventure = (adventure: IAdventure): LwThunkAction => async (
  dispatch: LwTHunkDispatch
) => {
  dispatch(requestRemoveAdventure());

  deleteAdventure(adventure)
    .then(
      (response) => response,
      (error) => handleError(error, [] as IPlayer[])
    )
    .then(() => {
      dispatch(removeAdventureSuccess(adventure));
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
      (error) => handleError(error, [] as IPlayer[])
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

const handleError = <T>(error: any, empty: T) => {
  console.log("An error occurred.", error);
  return empty;
};
