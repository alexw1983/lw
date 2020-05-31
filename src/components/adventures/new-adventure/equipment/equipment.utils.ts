import { IEquipment, IAdventure } from "../../../../redux/types";
import { Weapons } from "../../../../data/weapons";

export const GetEquipmentOptions = (bookNumber: number) => {
  switch (bookNumber) {
    case 2:
      return getBookTwoOptions();
    case 1:
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

export const buildPreviousEquipment = (
  mostRecentAdventure: IAdventure,
  currentBookNumber: number
) => {
  let startingEquipment = [] as IEquipment[];

  if (+currentBookNumber === 1) {
    startingEquipment = [
      {
        id: "axe",
        type: "WEAPON",
        name: "Axe",
      },
      {
        id: "meal",
        type: "BACKPACK_ITEM",
        name: "Meal",
      },
      {
        id: "map-of-summerlund",
        type: "SPECIAL_ITEM",
        name: "Map of Summerlund",
      },
    ] as IEquipment[];
  } else if (mostRecentAdventure) {
    startingEquipment = mostRecentAdventure.actionChart.equipment;
  }

  if (+currentBookNumber === 2) {
    startingEquipment.push({
      id: "seal-of-hammerdal",
      name: "Seal Of Hammerdal",
      type: "SPECIAL_ITEM",
      description: "Signet ring on right hand",
    });
  }

  return startingEquipment;
};

export const getRandomSelection = (bookNumber: number, r:number) => {
  const equipment = [] as IEquipment[];

  switch (r) {
    case 0:
      equipment.push(Weapons.Broadsword);
      break;
    case 1:
      equipment.push(Weapons.Sword);
      break;
    case 2:
      equipment.push({
        id: "helmet",
        name: "Helmet",
        type: "SPECIAL_ITEM",
        description: "Adds 2 ENDURANCE POINTS to your totsl",
      });
      break;
    case 3:
      equipment.push({
        id: "meal",
        name: "Meal",
        type: "BACKPACK_ITEM",
        description: "",
      });
      equipment.push({
        id: "meal",
        name: "Meal",
        type: "BACKPACK_ITEM",
        description: "",
      });
      break;
    case 4:
      equipment.push({
        id: "chain-mail-waistcoat",
        name: "Cahinmail Waistcoat",
        type: "SPECIAL_ITEM",
        description: "Adds 4 ENDURANCE POINTS to total when worn",
      });
      break;
    case 5:
      equipment.push(Weapons.Mace);
      break;
    case 6:
      equipment.push({
        id: "healing-potion",
        name: "Healing Potion",
        type: "BACKPACK_ITEM",
        description: "",
      });
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

}

const getBookTwoOptions = () => {
  const weapons = [
    Weapons.Sword,
    Weapons.ShortSword,
    Weapons.Mace,
    Weapons.QuarterStaff,
    Weapons.Spear,
    Weapons.Broadsword,
  ];
  const backpack = [
    {
      id: "healing-potion",
      type: "BACKPACK_ITEM",
      name: "Healing Potion",
      description:
        "This restores 4 ENDURANCE POINTS to your total when consumed after combat. Enough for one dose",
    } as IEquipment,
    {
      id: "two-meals",
      type: "BACKPACK_ITEM",
      name: "2 meals",
    } as IEquipment,
  ];
  const specialItems = [
    {
      id: "chainmail-waistcoat",
      type: "SPECIAL_ITEM",
      name: "Chainmail Waistcoat",
      description: "This restores 4 ENDURANCE POINTS to your total",
    } as IEquipment,
    {
      id: "shield",
      type: "SPECIAL_ITEM",
      name: "Shield",
      description: "Adds 2 points to your COMBAT SKILL when used in combat",
    } as IEquipment,
  ];

  return [...weapons, ...backpack, ...specialItems] as IEquipment[];
};
