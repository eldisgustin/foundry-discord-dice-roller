import type { Actor } from "../program/database.ts";
import { Abilities } from "./abilities.ts";
import type { CheckValue } from "./checks.ts";
import type { MergedProficiencies } from "./foundryvtt.ts";
import { type Proficiency } from "./skills.ts";

export function getProficiencyBonus(level: number) {
  if (level <= 4) {
    return 2;
  } else if (level <= 8) {
    return 3;
  } else if (level <= 12) {
    return 4;
  } else if (level <= 16) {
    return 5;
  } else if (level <= 20) {
    return 6;
  }
  // Return 2 as a fallback, this should never happen
  return 2;
}

function isAbilityCheck(check: CheckValue): boolean {
  return [
    Abilities.Strenght,
    Abilities.Dexterity,
    Abilities.Constitution,
    Abilities.Intelligence,
    Abilities.Charisma,
    Abilities.Wisdom,
    // @ts-expect-error: wtf does this even mean
  ].includes(check);
}

export function getActorProficiency(
  actor: Actor,
  check: CheckValue,
): Proficiency {
  const proficiencies = actor.proficiencies as MergedProficiencies;
  // @ts-expect-error: This is checked beforehand
  const proficiency: Proficiency = proficiencies[check] ?? "not_proficient";

  if (proficiency === "not_proficient" && actor.flags_hasjackofalltrades) {
    return "half_proficient";
  }

  return proficiency;
}
