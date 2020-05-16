import { ILwState, IPlayer } from "../state";

export function selectPlayer(state: ILwState, playerId: string) {
  return state.players.find((x) => x.id == playerId) as IPlayer;
}
