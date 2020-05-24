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
};

export const KaiDisciplines = [
  {
    id: "camouflage",
    name: "Camouflage",
    description: "",
  } as KaiDiscipline,
  {
    id: "hunting",
    name: "Hunting",
    description: "",
  } as KaiDiscipline,
  {
    id: "sixth-sense",
    name: "Sixth Sense",
    description: "",
  } as KaiDiscipline,
  {
    id: "tracking",
    name: "Tracking",
    description: "",
  } as KaiDiscipline,
  {
    id: "healing",
    name: "Healing",
    description: "",
  } as KaiDiscipline,
  {
    id: "weapon-skill",
    name: "Weapon Skill",
    description: "",
  } as KaiDiscipline,
  {
    id: "mind-shield",
    name: "Mind Shield",
    description: "",
  } as KaiDiscipline,
  {
    id: "mind-blast",
    name: "Mind Blast",
    description: "",
  } as KaiDiscipline,
  {
    id: "animal-kinship",
    name: "Animal Kinship",
    description: "",
  } as KaiDiscipline,
  {
    id: "mind-over-matter",
    name: "Mind Over Matter",
    description: "",
  } as KaiDiscipline,
] as KaiDiscipline[];
