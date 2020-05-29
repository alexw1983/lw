import { IPlayer, IAdventure } from "../redux/types";

/**
 * Loads players from the API
 */
export const getPlayers = async () => {
  const current = _load<IPlayer[]>("players");

  return {
    json: current ?? [],
  };
};

export const upsertPlayer = async (player: IPlayer) => {
  _upsert<IPlayer>("players", player, (a, b) => a.id === b.id);
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
  _upsert<IAdventure>(
    "adventures",
    adventure,
    (a, b) => a.bookNumber === b.bookNumber && a.playerId === b.playerId
  );

  // const current = _load<IAdventure[]>("adventures");
  // if (!current) {
  //   _save("adventures", [adventure]);
  // } else {
  //   if (
  //     current.find(
  //       (x) =>
  //         x.bookNumber === adventure.bookNumber &&
  //         x.playerId === adventure.playerId
  //     )
  //   ) {
  //     const newAdventures = current.reduce((acc, curr) => {
  //       if (
  //         curr.bookNumber !== adventure.bookNumber ||
  //         curr.playerId !== adventure.playerId
  //       ) {
  //         return [...acc, curr];
  //       } else {
  //         return [...acc, adventure];
  //       }
  //     }, []);

  //     _save("adventures", newAdventures);
  //   } else {
  //     _save("adventures", [...current, adventure]);
  //   }
  // }
};

const _upsert = <T>(key: string, item: T, matchFn: (a: T, b: T) => boolean) => {
  const current = _load<T[]>(key);
  if (!current) {
    _save(key, [item]);
  } else {
    if (current.find((x) => matchFn(x, item))) {
      const newItems = current.reduce((acc, curr) => {
        if (matchFn(curr, item)) {
          return [...acc, item];
        } else {
          return [...acc, curr];
        }
      }, []);

      _save(key, newItems);
    } else {
      _save(key, [...current, item]);
    }
  }
};

const _load = <T>(key: string) => {
  return JSON.parse(localStorage.getItem(key)) as T;
};

const _save = (key: string, item: any) => {
  localStorage.setItem(key, JSON.stringify(item));
};
