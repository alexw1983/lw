import { ILwState, IAdventure } from "../state";

export function selectAdventure(
  state: ILwState,
  playerId: string,
  bookNumber: number
) {
  const adventure = state.adventures.find(
    (x) => x.bookNumber === bookNumber && x.playerId === playerId
  ) as IAdventure;

  return adventure;
}

export function selectAdventuresForPlayer(state: ILwState, playerId: string) {
  return state.adventures.filter((x) => x.playerId === playerId);
}
