import { IEnemy } from "../redux/types";

const Giak = {
  name: "Giak",
  endurancePoints: 12,
  currentEndurancePoints: 12,
  combatSkill: 8,
  immuneToMindblast: false,
  undead: false,
  evadeAfter: undefined,
} as IEnemy;

export const Enemies = [Giak] as IEnemy[];
