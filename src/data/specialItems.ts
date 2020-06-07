import { IEquipment } from "../redux/types";

export const SpecialItems = {
  ChainmailWaistcoat: {
    id: "chainmail-waistcoat",
    type: "SPECIAL_ITEM",
    name: "Chainmail Waistcoat",
    description: "This restores 4 ENDURANCE POINTS to your total",
    endurancePointsBonus: 4,
  } as IEquipment,
  Shield: {
    id: "shield",
    type: "SPECIAL_ITEM",
    name: "Shield",
    description: "Adds 2 points to your COMBAT SKILL when used in combat",
    combatSkillBonus: 2,
  } as IEquipment,
  Helmet: {
    id: "helmet",
    name: "Helmet",
    type: "SPECIAL_ITEM",
    description: "Adds 2 ENDURANCE POINTS to your total",
    endurancePointsBonus: 2,
  } as IEquipment,
  PaddedLeatherWaistcoat: {
    id: "padded-leather-waistcoat",
    type: "SPECIAL_ITEM",
    name: "Padded Leather Waistcoat",
    description: "This adds 2 ENDURANCE POINTS to your total",
    endurancePointsBonus: 2,
  } as IEquipment,
  MapOfSummerlund: {
    id: "map-of-summerlund",
    type: "SPECIAL_ITEM",
    name: "Map of Summerlund",
  } as IEquipment,
  SealOfHammerdal: {
    id: "seal-of-hammerdal",
    name: "Seal Of Hammerdal",
    type: "SPECIAL_ITEM",
    description: "Signet ring on right hand",
  } as IEquipment,
  MapOfKalte: {
    id: "map-of-kalte",
    name: "Map Of Kalter",
    type: "SPECIAL_ITEM",
    description: "",
  } as IEquipment,
};
