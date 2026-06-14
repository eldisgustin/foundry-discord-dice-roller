import {
  type ChatInputCommandInteraction,
  MessageFlags,
  SlashCommandBuilder,
} from "discord.js";
import { prisma } from "../../program/database.ts";

export const remove = {
  slash: new SlashCommandBuilder()
    .setName("remove")
    .setDescription("Deletes a character")
    .addStringOption((option) =>
      option
        .setName("character")
        .setDescription("Character to delete")
        .setAutocomplete(true)
        .setRequired(true),
    ),
  async handler(interaction: ChatInputCommandInteraction) {
    const actor = await prisma.actor.findFirst({
      where: {
        name: interaction.options.getString("character")!,
        owner: interaction.user.id,
      },
    });

    if (!actor) {
      return await interaction.reply("Could not find character");
    }

    await prisma.actor.delete({
      where: {
        id: actor.id,
      },
    });

    await interaction.reply({
      content: "Character deleted",
      flags: MessageFlags.Ephemeral,
    });
  },
};
