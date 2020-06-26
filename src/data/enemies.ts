import { IEnemy } from "../redux/types";

const Giak = {
  name: "Giak",
  endurancePoints: 9,
  currentEndurancePoints: 9,
  combatSkill: 9,
  immuneToMindblast: false,
  undead: false,
  evadeAfter: undefined,
  combatSkillBuffer: 0,
} as IEnemy;

const Giak13 = {
  name: "Giak",
  endurancePoints: 10,
  currentEndurancePoints: 10,
  combatSkill: 13,
  immuneToMindblast: false,
  undead: false,
  evadeAfter: undefined,
  combatSkillBuffer: 0,
} as IEnemy;

const Giak12 = {
  name: "Giak",
  endurancePoints: 10,
  currentEndurancePoints: 10,
  combatSkill: 12,
  immuneToMindblast: false,
  undead: false,
  evadeAfter: undefined,
  combatSkillBuffer: 0,
} as IEnemy;

const GiakAndDoomWolf = {
  name: "Giak + Doomwolf",
  endurancePoints: 24,
  currentEndurancePoints: 24,
  combatSkill: 15,
  immuneToMindblast: false,
  undead: false,
  evadeAfter: undefined,
  combatSkillBuffer: 0,
} as IEnemy;

const Madman = {
  name: "Madman",
  endurancePoints: 11,
  currentEndurancePoints: 11,
  combatSkill: 10,
  immuneToMindblast: false,
  undead: false,
  evadeAfter: undefined,
  combatSkillBuffer: 0,
} as IEnemy;

const Kraan = {
  name: "Kraan",
  endurancePoints: 24,
  currentEndurancePoints: 24,
  combatSkill: 16,
  immuneToMindblast: false,
  undead: false,
  evadeAfter: undefined,
  combatSkillBuffer: -1,
} as IEnemy;

const Vordak = {
  name: "Vordak",
  endurancePoints: 25,
  currentEndurancePoints: 25,
  combatSkill: 17,
  immuneToMindblast: false,
  undead: false,
  evadeAfter: undefined,
  combatSkillBuffer: 0,
  hasMindBlast: true,
} as IEnemy;

const BlackBear = {
  name: "Vordak",
  endurancePoints: 25,
  currentEndurancePoints: 25,
  combatSkill: 17,
  immuneToMindblast: false,
  undead: false,
  evadeAfter: undefined,
  combatSkillBuffer: 0,
  hasMindBlast: false,
} as IEnemy;

export const Enemies = [
  Giak,
  Giak12,
  Giak13,
  Kraan,
  Vordak,
  BlackBear,
  GiakAndDoomWolf,
  Madman,
] as IEnemy[];
