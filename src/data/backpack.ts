import { IEquipment } from "../redux/types";
import { v4 as uuidv4 } from "uuid";

export const BackpackItems = {
 
  HealingPotion: () =>
    ({
      id: "healing-potion",
      type: "BACKPACK_ITEM",
      name: "Healing Potion",
      description:
        "This restores 4 ENDURANCE POINTS to your total when consumed after combat. Enough for one dose",
    } as IEquipment),
  Meal: () =>
    ({
      id: uuidv4(),
      type: "BACKPACK_ITEM",
      name: "Meal",
    } as IEquipment),
  TwoMeals: () => [this.Meal(), this.Meal()],

  PotionOfLaumspur: () =>
    ({
      id: uuidv4(),
      type: "BACKPACK_ITEM",
      name: "Potion Of Laumspur",
      description:
        "This restores 4 ENDURANCE POINTS to your total when consumed after combat. Enough for one dose",
    } as IEquipment),
  SpecialRations: () =>
    ({
      id: uuidv4(),
      type: "BACKPACK_ITEM",
      name: "Special Rations",
    } as IEquipment),
};
