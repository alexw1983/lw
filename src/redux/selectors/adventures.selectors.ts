import { ILwState, IAdventure } from "../types";

export function selectAdventure(
  state: ILwState,
  playerId: string,
  bookNumber: number
) {
  return _getCurrentAdventure(state, playerId, bookNumber);
}

export function selectCurrentEndurancePoints(
  state: ILwState,
  playerId: string,
  bookNumber: number
) {
  return _getCurrentAdventure(state, playerId, bookNumber).actionChart
    .currentEndurancePoints;
}

export function selectCurrentBeltPouch(
  state: ILwState,
  playerId: string,
  bookNumber: number
) {
  return _getCurrentAdventure(state, playerId, bookNumber).actionChart
    .beltPouch;
}

export function selectCurrentEquipment(
  state: ILwState,
  playerId: string,
  bookNumber: number
) {
  return _getCurrentAdventure(state, playerId, bookNumber).actionChart
    .equipment;
}

export function selectAdventuresForPlayer(state: ILwState, playerId: string) {
  return state.adventures.filter((x) => x.playerId === playerId);
}

const _getCurrentAdventure = (
  state: ILwState,
  playerId: string,
  bookNumber: number
) =>
  state.adventures.find(
    (x) => +x.bookNumber === +bookNumber && x.playerId === playerId
  ) as IAdventure;
