import { IAdventure, IPlayer, ILwState } from "../types";
import { LwActionTypes, LwThunkAction, LwTHunkDispatch } from "./actionTypes";
import {
  upsertAdventure,
  getAdventures,
  deleteAdventure,
  API,
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

export const receiveAdventures = (adventures: IAdventure[]): LwActionTypes => {
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
      (error) => handleError(error, [] as IAdventure[])
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

export const takeDamageRequest = (): LwActionTypes => {
  return {
    type: "REQUEST_TAKE_DAMAGE",
    payload: {},
  };
};

export const takeDamageSuccess = (
  damage: number,
  bookNumber: number,
  playerId: string
): LwActionTypes => {
  return {
    type: "TAKE_DAMAGE_SUCCESS",
    payload: {
      damage: damage,
      bookNumber: bookNumber,
      playerId: playerId,
    },
  };
};

export const takeDamage = (
  damage: number,
  bookNumber: number,
  playerId: string
): LwThunkAction => async (dispatch: LwTHunkDispatch) => {
  dispatch(takeDamageRequest());

  API.takeDamage(damage, bookNumber, playerId)
    .then(
      (response) => response,
      (error) => handleError(error, [] as IAdventure[])
    )
    .then(() => {
      dispatch(takeDamageSuccess(damage, bookNumber, playerId));
    });
};

export const spendMoney = (
  cost: number,
  bookNumber: number,
  playerId: string
): LwThunkAction => async (dispatch: LwTHunkDispatch) => {
  dispatch(spendMoneyRequest());

  API.spendMoney(cost, bookNumber, playerId)
    .then(
      (response) => response,
      (error) => handleError(error, [] as IAdventure[])
    )
    .then(() => {
      dispatch(spendMoneySuccess(cost, bookNumber, playerId));
    });
};

export const spendMoneyRequest = (): LwActionTypes => {
  return {
    type: "REQUEST_SPEND_MONEY",
    payload: {},
  };
};

export const spendMoneySuccess = (
  cost: number,
  bookNumber: number,
  playerId: string
): LwActionTypes => {
  return {
    type: "SUCCESS_SPEND_MONEY",
    payload: {
      cost: cost,
      bookNumber: bookNumber,
      playerId: playerId,
    },
  };
};



const handleError = <T>(error: any, empty: T) => {
  console.log("An error occurred.", error);
  return empty;
};
