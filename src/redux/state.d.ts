export interface IKaiDiscipline {
  name: string;
  description: string;
}

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
  bookNumber: number;
  status: ADVENTURE_STATUS;
  actionChart: IActionChart;
}

export interface IPlayer {
  name: string;
  id: string;
  adventures: IAdventure[];
}

export interface ILwState {
  loading: boolean;
  actionChart: IActionChart;
  players: IPlayer[];
  showNewPlayerForm: boolean;
}
