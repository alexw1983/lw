import { IPlayer, IAdventure, IEquipment } from "../redux/types";

const _match = (a: IAdventure, bookNumber: number, playerId: string) => {
  return +a.bookNumber === +bookNumber && a.playerId === playerId;
};
const _takeDamage = async (
  damage: number,
  bookNumber: number,
  playerId: string
) => {
  const adventures = _load<IAdventure[]>("adventures");
  if (adventures) {
    const current = adventures.find((x) => _match(x, bookNumber, playerId));
    if (current) {
      current.actionChart.currentEndurancePoints =
        current.actionChart.currentEndurancePoints - damage;

      _upsertAdventure(current);
    }
  }
};

const _spendMoney = async (
  cost: number,
  bookNumber: number,
  playerId: string
) => {
  const adventures = _load<IAdventure[]>("adventures");
  if (adventures) {
    const current = adventures.find((x) => _match(x, bookNumber, playerId));
    if (current) {
      current.actionChart.beltPouch = current.actionChart.beltPouch - cost;

      _upsertAdventure(current);
    }
  }
};

const _removeEquipment = async (
  equipment: IEquipment,
  bookNumber: number,
  playerId: string
) => {
  const adventures = _load<IAdventure[]>("adventures");

  if (adventures) {
    const current = adventures.find((x) =>
      _findAdventure(x, bookNumber, playerId)
    );

    if (current) {
      current.actionChart.equipment = current.actionChart.equipment.filter(
        (x) => x.id !== equipment.id
      );

      _upsertAdventure(current);
    }
  }
};

const _addEquipment = async (
  equipment: IEquipment,
  bookNumber: number,
  playerId: string
) => {
  const adventures = _load<IAdventure[]>("adventures");

  if (adventures) {
    const current = adventures.find((x) =>
      _findAdventure(x, bookNumber, playerId)
    );

    if (current) {
      current.actionChart.equipment.push(equipment);
    }

    _upsertAdventure(current);
  }
};

const _findAdventure = (
  adventure: IAdventure,
  bookNumber: number,
  playerId: string
) => {
  return (
    +adventure.bookNumber === +bookNumber && adventure.playerId === playerId
  );
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
  console.log("GOT HERE 6");
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
      console.log("GOT HERE 5");
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
  addEquipment: _addEquipment,
};
