import { KaiDisciplines } from "../../../../data/disciplines";
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
      return Weapons.Dagger.id;
    case 1:
      return Weapons.Spear.id;
    case 2:
      return Weapons.Mace.id;
    case 3:
      return Weapons.ShortSword.id;
    case 4:
      return Weapons.Warhammer.id;
    case 5:
      return Weapons.Sword.id;
    case 6:
      return Weapons.Axe.id;
    case 7:
      return Weapons.Sword.id;
    case 8:
      return Weapons.QuarterStaff.id;
    case 9:
      return Weapons.Broadsword.id;
    default:
      return "";
  }
};
