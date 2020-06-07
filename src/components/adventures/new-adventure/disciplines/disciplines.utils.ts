import {
  KaiDisciplines,
  MagnaKaiDisciplines,
} from "../../../../data/disciplines";
import { IDiscipline, IAdventure } from "../../../../redux/types";
import { Weapons } from "../../../../data/weapons";

export const getTypeName = (typeName: string) => {
  switch (typeName) {
    case "KAI":
      return "Kai";
    case "MAGNAKAI":
      return "Magnakai";
    case "GRAND_MASTER":
      return "Grand Master";
    default:
      return "";
  }
};

export const getOptions = (bookNumber: number, selection: IDiscipline[]) => {
  switch (+bookNumber) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
      return KaiDisciplines.filter(
        (x) => !selection.map((s) => s.id).includes(x.id)
      );
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
    case 12:
      return MagnaKaiDisciplines.filter(
        (x) => !selection.map((s) => s.id).includes(x.id)
      );
  }
};

export const buildPreviousDisciplines = (
  mostRecentAdventure: IAdventure | undefined
) => {
  if (mostRecentAdventure) {
    return mostRecentAdventure.actionChart.disciplines;
  }

  return [];
};

export const getRandomWeapon = (r: number) => {
  switch (r) {
    case 0:
      return Weapons.Dagger.name;
    case 1:
      return Weapons.Spear.name;
    case 2:
      return Weapons.Mace.name;
    case 3:
      return Weapons.ShortSword.name;
    case 4:
      return Weapons.Warhammer.name;
    case 5:
      return Weapons.Sword.name;
    case 6:
      return Weapons.Axe.name;
    case 7:
      return Weapons.Sword.name;
    case 8:
      return Weapons.QuarterStaff.name;
    case 9:
      return Weapons.Broadsword.name;
    default:
      return "";
  }
};
