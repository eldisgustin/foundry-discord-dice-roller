import { roll } from "./commands/roll.ts";
import { sync } from "./commands/sync.ts";
import { remove } from "./commands/remove.ts";

export const commands = {
  roll,
  sync,
  remove,
} as const;

export type Command = keyof typeof commands;
