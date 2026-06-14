import consola from "consola";
import { getProficiencyBonus } from "./actor.ts";

export type Proficiency =
  | "proficient"
  | "not_proficient"
  | "expertise"
  | "half_proficient";

export const Skills = {
  Acrobatics: "acr",
  AnimalHandling: "ani",
  Arcana: "arc",
  Athletics: "ath",
  Deception: "dec",
  History: "his",
  Insight: "ins",
  Intimidation: "itm",
  Investigation: "inv",
  Medicine: "med",
  Nature: "nat",
  Perception: "prc",
  Persuasion: "per",
  Performance: "prf",
  Religion: "rel",
  SleightOfHand: "slt",
  Stealth: "ste",
  Survival: "sur",
} as const;

export type Skill = keyof typeof Skills;
export type SkillValue = (typeof Skills)[Skill];

export function getSkillModifier({
  level,
  proficiency: proficiency,
}: {
  level: number;
  proficiency: Proficiency;
}) {
  const pb = getProficiencyBonus(level);
  let pbCoeficient: number = 0;

  switch (proficiency) {
    case "proficient":
      pbCoeficient = 1;
      break;
    case "expertise":
      pbCoeficient = 2;
      break;
    case "half_proficient":
      pbCoeficient = 0.5;
      break;
    case "not_proficient":
      pbCoeficient = 0;
      break;
  }

  return Math.floor(pb * pbCoeficient);
}
