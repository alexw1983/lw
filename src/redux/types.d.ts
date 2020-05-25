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
  weapon: string | undefined;
};

export interface IActionChart {
  combatSkill: number;
  endurancePoints: number;
  kaiDiscipines: IKaiDiscipline[];
  weapons: string[];
  backpack: string[];
  beltPouch: number;
  specialItems: string[];
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
  actionChart: IActionChart;
  players: IPlayer[];
  adventures: IAdventure[];
  showNewPlayerForm: boolean;
}
