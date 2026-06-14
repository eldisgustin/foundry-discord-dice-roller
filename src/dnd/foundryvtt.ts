import type { AbilityValue } from "./abilities.ts";
import type { Proficiency, SkillValue } from "./skills.ts";
import type { ToolValue } from "./tools.ts";

export type FoundryVttActorJSON = {
  folder: string;
  name: string;
  type: string;
  img: string;
  system: {
    abilities: Record<AbilityValue, { value: number }>;
    skills: Record<SkillValue, { value: number }>;
    tools: Record<ToolValue, { value: number }>;
  };
  prototypeToken: unknown;
  items: Array<{
    _id: string;
    name: string;
    type: string;
    system: {
      description: string;
      source: unknown;
      cover: unknown | null;
      identifier: string;
    };
  }>;
  effects: unknown[];
  flags: unknown;
  _stats: {
    systemId: string;
    coreVersion: string;
    createdTime: number;
    modifiedTime: number;
    lastModifiedBy: string;
    compendiumSource: string | null;
    duplicateSource: string | null;
    exportSource: {
      worldId: string;
      uuid: string;
      coreVersion: string;
      systemId: string;
      systemVersion: string;
    };
  };
  ownership: {
    default: number; // Possibly an enum
  };
};

export type MergedProficiencies = Record<ToolValue | SkillValue, Proficiency>;

export function getActorTotalLevel(actor: FoundryVttActorJSON) {
  const classes: any[] = actor.items.filter((item) => item.type === "class");

  return classes.reduce<number>(
    (prev, current) => prev + current.system.levels,
    0,
  );
}

export function parseActor(json: FoundryVttActorJSON) {
  const abilities = Object.fromEntries(
    Object.entries(json.system.abilities).map(([ability, { value }]) => [
      ability,
      value,
    ]),
  ) as Record<AbilityValue, number>;

  const hasJackOfAllTrades = Boolean(
    json.items.find(
      ({ system: { identifier } }) => identifier === "jack-of-all-trades",
    ),
  );
  const level = getActorTotalLevel(json);
  const proficiencies = Object.fromEntries(
    [
      ...Object.entries(json.system.tools),
      ...Object.entries(json.system.skills),
    ].map(([skill, { value }]): [string, Proficiency] => {
      let proficiency: Proficiency;
      switch (value) {
        case 2:
          proficiency = "expertise";
          break;
        case 1:
          proficiency = "proficient";
          break;
        default:
        case 0:
          proficiency = "not_proficient";
          break;
      }
      return [skill, proficiency];
    }),
  ) as Record<SkillValue | ToolValue, Proficiency>;

  return {
    id: json._stats.exportSource.uuid,
    name: json.name,
    level: level,
    avatarUrl: json.img,
    abilities: abilities,
    proficiencies: proficiencies,
    hasJackOfAllTrades: hasJackOfAllTrades,
  };
}
