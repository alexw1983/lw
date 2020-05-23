import { ILwState, IPlayer } from "../state";

export function selectPlayer(state: ILwState, playerId: string) {
  return state.players.find((x) => x.id === playerId) as IPlayer;
}

export function selectAdventure(state: ILwState, playerId: string, bookNumber: number) {
  const player = state.players.find((x) => x.id === playerId) as IPlayer;

  if  (player){
    return player.adventures.find(a => +a.bookNumber === +bookNumber);
  }

  return undefined;
}