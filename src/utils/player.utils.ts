import { IPlayer } from "../redux/state";
import { v4 as uuidv4 } from "uuid";

export const generateNewPlayer = (playerName: string): IPlayer => {
  return { id: uuidv4(), name: playerName, adventures: [] };
};
