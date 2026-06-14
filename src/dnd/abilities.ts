export const Abilities = {
  Strenght: "str",
  Dexterity: "dex",
  Constitution: "con",
  Intelligence: "int",
  Wisdom: "wis",
  Charisma: "cha",
} as const;

export type Ability = keyof typeof Abilities;
export type AbilityValue = (typeof Abilities)[Ability];

export function getAbilityModifier(value: number) {
  return Math.floor((value - 10) / 2);
}
