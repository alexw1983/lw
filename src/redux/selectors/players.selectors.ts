import { ILwState, IPlayer } from "../types";

export function selectPlayer(state: ILwState, playerId: string) {
  return state.players.find((x) => x.id === playerId) as IPlayer;
}
