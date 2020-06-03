export type KaiDiscipineId =
  | "camouflage"
  | "hunting"
  | "sixth-sense"
  | "tracking"
  | "healing"
  | "weapon-skill"
  | "mind-shield"
  | "mind-blast"
  | "animal-kinship"
  | "mind-over-matter";

export type KaiDiscipline = {
  id: KaiDiscipineId;
  name: string;
  description: string;
  weaponNumber: number | undefined;
};

interface IDiscipline {
  id: string;
  name: string;
  type: "KAI" | "MAGNAKAI" | "GRAND_MASTER";
  description?: string;
}

interface IEquipment {
  id: string;
  type: "WEAPON" | "SPECIAL_ITEM" | "BACKPACK_ITEM";
  name: string;
  description?: string;
}

export interface IActionChart {
  combatSkill: number;
  endurancePoints: number;
  currentEndurancePoints: number;
  beltPouch: number;
  equipment: IEquipment[];
  disciplines: IDiscipline[];
  weaponSkill?: string | undefined;
  weaponMastery?: string | undefined;
  grandWeaponMastery?: string | undefined;
}

export type ADVENTURE_STATUS = "COMPLETE" | "IN PROGRESS" | "NOT STARTED";

export interface IAdventure {
  playerId: string;
  bookNumber: number;
  status: ADVENTURE_STATUS;
  actionChart: IActionChart;
}

export interface IPlayer {
  name: string;
  id: string;
}

export interface ILwState {
  loading: boolean;
  players: IPlayer[];
  adventures: IAdventure[];
  showNewPlayerForm: boolean;
}

export interface IEnemy {
  name: string;
  endurancePoints: number;
  currentEndurancePoints: number;
  combatSkill: number;
  immuneToMindblast: boolean;
  undead: boolean;
  evadeAfter: number | undefined;
}
