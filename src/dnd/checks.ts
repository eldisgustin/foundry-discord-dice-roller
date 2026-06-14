import { Abilities } from "./abilities.ts";
import { Skills } from "./skills.ts";
import { Tools } from "./tools.ts";

export const Checks = {
  ...Abilities,
  ...Skills,
  ...Abilities,
  ...Tools,
} as const;

export type Check = keyof typeof Checks;
export type CheckValue = (typeof Checks)[Check];

export function getCheckLabel(item: CheckValue): string {
  const [label] = Object.entries(Checks).find(([_k, v]) => item === v) as [
    Check,
    CheckValue,
  ];

  return label;
}
