
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

export interface ILwState {
  loading: boolean;
  actionChart: IActionChart;
}
