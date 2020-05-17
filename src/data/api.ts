import { IPlayer } from "../redux/state";

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

export const upsertPlayer = async (player: IPlayer) => {
  const current = JSON.parse(localStorage.getItem("players")) as IPlayer[];
  if (!current) {
    localStorage.setItem("players", JSON.stringify([player]));
  } else {
    if (current.find((x) => x.id == player.id)) {
      const newPlayers = current.reduce((acc, curr) => {
        if (curr.id !== player.id) {
          return [...acc, curr];
        } else {
          return [...acc, player];
        }
      }, []);

      localStorage.setItem("players", JSON.stringify(newPlayers));
    } else {
      localStorage.setItem("players", JSON.stringify([...current, player]));
    }
  }
};
