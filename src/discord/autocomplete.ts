import { type AutocompleteInteraction } from "discord.js";
import { prisma } from "../program/database.ts";
import { Checks } from "../dnd/checks.ts";
import Fuse from "fuse.js";

const checks = new Fuse(
  Object.entries(Checks).map(([name, value]) => ({ name, value })),
  {
    keys: ["name"],
  },
);

export const autocomplete = {
  character: async function (interaction: AutocompleteInteraction) {
    const userId = interaction.user.id;
    const focusedValue = interaction.options.getFocused();
    const actors = await prisma.actor.findMany({ where: { owner: userId } });
    const choices = actors.map((actor) => actor.name);
    const filtered = choices.filter((choice) =>
      choice.startsWith(focusedValue),
    );

    await interaction.respond(
      filtered.map((choice) => ({ name: choice, value: choice })),
    );
  },
  check: async function (interaction: AutocompleteInteraction) {
    const focusedValue = interaction.options.getFocused();
    const filtered = checks.search(focusedValue, { limit: 25 });

    await interaction.respond(filtered.map(({ item }) => item));
  },
} as const;

export type Autocomplete = keyof typeof autocomplete;
