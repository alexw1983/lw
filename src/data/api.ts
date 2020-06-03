import { IPlayer, IAdventure, IEquipment } from "../redux/types";

const _takeDamage = async (
  damage: number,
  bookNumber: number,
  playerId: string
) => {
  const adventures = _load<IAdventure[]>("adventures");

  if (adventures) {
    const current = adventures.find(
      (x) => +x.bookNumber === bookNumber && x.playerId === playerId
    );
    if (current) {
      current.actionChart.currentEndurancePoints =
        current.actionChart.currentEndurancePoints - damage;
    }
  }

  _save("adventures", adventures);
};

const _spendMoney = async (
  cost: number,
  bookNumber: number,
  playerId: string
) => {
  const adventures = _load<IAdventure[]>("adventures");

  if (adventures) {
    const current = adventures.find(
      (x) => +x.bookNumber === bookNumber && x.playerId === playerId
    );
    if (current) {
      current.actionChart.beltPouch = current.actionChart.beltPouch - cost;
    }
  }

  _save("adventures", adventures);
};

const _removeEquipment = async (
  equipment: IEquipment,
  bookNumber: number,
  playerId: string
) => {
  const adventures = _load<IAdventure[]>("adventures");

  if (adventures) {
    const current = adventures.find(
      (x) => +x.bookNumber === bookNumber && x.playerId === playerId
    );

    if (current) {
      current.actionChart.equipment = current.actionChart.equipment.filter(
        (x) => x.id !== equipment.id
      );
    }
  }

  _save("adventures", adventures);
};

const _getPlayers = async () => {
  const current = _load<IPlayer[]>("players");

  return {
    json: current ?? [],
  };
};

const _upsertPlayer = async (player: IPlayer) => {
  _upsert<IPlayer>("players", player, (a, b) => a.id === b.id);
};

const _getAdventures = async () => {
  const current = _load<IAdventure[]>("adventures");

  return {
    json: current ?? [],
  };
};

const _deleteAdventure = async (adventure: IAdventure) => {
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

const _upsertAdventure = async (adventure: IAdventure) => {
  _upsert<IAdventure>(
    "adventures",
    adventure,
    (a, b) => +a.bookNumber === +b.bookNumber && a.playerId === b.playerId
  );
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

export const API = {
  getPlayers: _getPlayers,
  upsertPlayer: _upsertPlayer,
  getAdventures: _getAdventures,
  deleteAdventure: _deleteAdventure,
  upsertAdventure: _upsertAdventure,
  takeDamage: _takeDamage,
  spendMoney: _spendMoney,
  removeEquipment: _removeEquipment,
};
