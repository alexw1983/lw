import { IEquipment } from "../redux/types";

export const SpecialItems = {
  ChainmailWaistcoat: {
    id: "chainmail-waistcoat",
    type: "SPECIAL_ITEM",
    name: "Chainmail Waistcoat",
    description: "This restores 4 ENDURANCE POINTS to your total",
  } as IEquipment,
  Shield: {
    id: "shield",
    type: "SPECIAL_ITEM",
    name: "Shield",
    description: "Adds 2 points to your COMBAT SKILL when used in combat",
  } as IEquipment,
  Helmet: {
    id: "helmet",
    name: "Helmet",
    type: "SPECIAL_ITEM",
    description: "Adds 2 ENDURANCE POINTS to your totsl",
  } as IEquipment,
  PaddedLeatherWaistcoat: {
    id: "padded-leather-waistcoat",
    type: "SPECIAL_ITEM",
    name: "Padded Leather Waistcoat",
    description: "This adds 2 ENDURANCE POINTS to your total",
  } as IEquipment,
};
