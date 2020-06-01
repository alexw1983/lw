import { IEquipment, IAdventure } from "../../../../redux/types";
import { Weapons } from "../../../../data/weapons";
import { BackpackItems } from "../../../../data/backpack";
import { SpecialItems } from "../../../../data/specialItems";

export const GetEquipmentOptions = (bookNumber: number) => {
  switch (bookNumber) {
    case 1:
      return [];
    case 2:
      return getBookTwoOptions();
    case 3:
      return getBookThreeOptions();
    case 4:
      return getBookFourOptions();
    case 5:
      return getBookFiveOptions();
    default:
      return [];
  }
};

export const getTypeName = (equipmentType: string) => {
  switch (equipmentType) {
    case "WEAPON":
      return "Weapons";
    case "BACKPACK_ITEM":
      return "Backpack";
    case "SPECIAL_ITEM":
      return "Special Items";
    default:
      return "";
  }
};

export const maxChoices = (bookNumber: number) => {
  switch (+bookNumber) {
    case 1:
      return 0;
    case 2:
    case 3:
      return 2;
    case 4:
      return 6;
  }
};

export const buildPreviousEquipment = (
  mostRecentAdventure: IAdventure,
  currentBookNumber: number
) => {
  let startingEquipment = [] as IEquipment[];

  if (+currentBookNumber === 1) {
    startingEquipment = [
      Weapons.Axe,
      BackpackItems.Meal,
      {
        id: "map-of-summerlund",
        type: "SPECIAL_ITEM",
        name: "Map of Summerlund",
      },
    ] as IEquipment[];
  } else if (mostRecentAdventure) {
    startingEquipment = mostRecentAdventure.actionChart.equipment;
  }

  switch (+currentBookNumber) {
    case 2:
      startingEquipment.push({
        id: "seal-of-hammerdal",
        name: "Seal Of Hammerdal",
        type: "SPECIAL_ITEM",
        description: "Signet ring on right hand",
      });
      break;
    case 3:
      startingEquipment.push({
        id: "map-of-kalte",
        name: "Map Of Kalter",
        type: "SPECIAL_ITEM",
        description: "",
      });
      break;
  }

  return startingEquipment;
};

export const getRandomSelection = (bookNumber: number, r: number) => {
  const equipment = [] as IEquipment[];

  switch (r) {
    case 0:
      equipment.push(Weapons.Broadsword);
      break;
    case 1:
      equipment.push(Weapons.Sword);
      break;
    case 2:
      equipment.push(SpecialItems.Helmet);
      break;
    case 3:
      equipment.push(BackpackItems.Meal());
      equipment.push(BackpackItems.Meal());
      break;
    case 4:
      equipment.push(SpecialItems.ChainmailWaistcoat);
      break;
    case 5:
      equipment.push(Weapons.Mace);
      break;
    case 6:
      equipment.push(BackpackItems.HealingPotion);
      break;
    case 7:
      equipment.push(Weapons.QuarterStaff);
      break;
    case 8:
      equipment.push(Weapons.Spear);
      break;
    case 9:
      break;
  }

  return equipment;
};

const getBookTwoOptions = () => {
  return [
    Weapons.Sword,
    Weapons.ShortSword,
    Weapons.Mace,
    Weapons.QuarterStaff,
    Weapons.Spear,
    Weapons.Broadsword,
    BackpackItems.HealingPotion,
    BackpackItems.TwoMeals,
    SpecialItems.ChainmailWaistcoat,
    SpecialItems.Shield,
  ] as IEquipment[];
};

const getBookThreeOptions = () => {
  return [
    Weapons.Sword,
    Weapons.ShortSword,
    Weapons.Mace,
    Weapons.QuarterStaff,
    Weapons.Spear,
    Weapons.Axe,
    Weapons.Warhammer,
    Weapons.Broadsword,
    BackpackItems.PotionOfLaumspur(),
    BackpackItems.SpecialRations(),
    SpecialItems.PaddedLeatherWaistcoat,
  ] as IEquipment[];
};

const getBookFourOptions = () => {
  return [
    Weapons.Warhammer,
    Weapons.Dagger,
    Weapons.Sword,
    Weapons.Spear,
    Weapons.Mace,
    BackpackItems.PotionOfLaumspur(),
    BackpackItems.PotionOfLaumspur(),
    BackpackItems.SpecialRations(),
    BackpackItems.SpecialRations(),
    BackpackItems.SpecialRations(),
    BackpackItems.SpecialRations(),
    BackpackItems.SpecialRations(),
    SpecialItems.ChainmailWaistcoat,
    SpecialItems.Shield,
  ] as IEquipment[];
};

const getBookFiveOptions = () => {
  return [
    Weapons.Dagger,
    Weapons.Sword,
    Weapons.Spear,
    Weapons.Mace,
    BackpackItems.PotionOfLaumspur(),
    BackpackItems.SpecialRations(),
    BackpackItems.SpecialRations(),
    SpecialItems.Shield,
  ] as IEquipment[];
};
