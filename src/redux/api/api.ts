import { IPlayer } from "../state";

/**
 * Loads players from the API
 */
export const getPlayers = async () => {
  const current = JSON.parse(localStorage.getItem("players"));

  return {
    json: current ?? [],
  };
};

export const addPlayer = async (player: IPlayer) => {
  const current = JSON.parse(localStorage.getItem("players"));
  if (!current) {
    localStorage.setItem("players", JSON.stringify([player]));
  } else {
    localStorage.setItem("players", JSON.stringify([...current, player]));
  }

  return true;
};
