import { IPlayer, IAdventure } from "../redux/state";

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
  const current = _load<IPlayer[]>("players");
  if (!current) {
    _save("players", [player]);
  } else {
    if (current.find((x) => x.id === player.id)) {
      const newPlayers = current.reduce((acc, curr) => {
        if (curr.id !== player.id) {
          return [...acc, curr];
        } else {
          return [...acc, player];
        }
      }, []);

      _save("players", newPlayers);
    } else {
      _save("players", [...current, player]);
    }
  }
};

export const getAdventures = async () => {
  const current = JSON.parse(localStorage.getItem("adventures"));

  return {
    json: current ?? [],
  };
};

export const deleteAdventure = async (adventure: IAdventure) => {
  const current = _load<IAdventure[]>("adventures");
  if (current) {
    const newAdventures = current.reduce((acc, curr) => {
      if (
        curr.bookNumber === adventure.bookNumber &&
        curr.playerId === adventure.playerId
      ) {
        return [...acc];
      } else {
        return [...acc, curr];
      }
    }, []);

    _save("adventures", newAdventures);
  }
};

export const upsertAdventure = async (adventure: IAdventure) => {
  const current = _load<IAdventure[]>("adventures");
  if (!current) {
    _save("adventures", [adventure]);
  } else {
    if (
      current.find(
        (x) =>
          x.bookNumber === adventure.bookNumber &&
          x.playerId === adventure.playerId
      )
    ) {
      const newAdventures = current.reduce((acc, curr) => {
        if (
          curr.bookNumber !== adventure.bookNumber ||
          curr.playerId !== adventure.playerId
        ) {
          return [...acc, curr];
        } else {
          return [...acc, adventure];
        }
      }, []);

      _save("adventures", newAdventures);
    } else {
      _save("adventures", [...current, adventure]);
    }
  }
};

const _load = <T>(key: string) => {
  return JSON.parse(localStorage.getItem("adventures")) as T;
};

const _save = (key: string, item: any) => {
  localStorage.setItem(key, JSON.stringify(item));
};
