import { IEquipment } from "../redux/types";

export const BackpackItems = {
  HealingPotion: {
    id: "healing-potion",
    type: "BACKPACK_ITEM",
    name: "Healing Potion",
    description:
      "This restores 4 ENDURANCE POINTS to your total when consumed after combat. Enough for one dose",
  } as IEquipment,
  Meal: {
    id: "meal",
    type: "BACKPACK_ITEM",
    name: "Meal",
  } as IEquipment,
  TwoMeals: {
    id: "two-meals",
    type: "BACKPACK_ITEM",
    name: "2 meals",
  } as IEquipment,
  PotionOfLaumspur: {
    id: "potion-of-laumspur",
    type: "BACKPACK_ITEM",
    name: "Potion Of Laumspur",
    description:
      "This restores 4 ENDURANCE POINTS to your total when consumed after combat. Enough for one dose",
  } as IEquipment,
  SpecialRations: {
    id: "special-rations",
    type: "BACKPACK_ITEM",
    name: "Special Rations",
  } as IEquipment,
};
