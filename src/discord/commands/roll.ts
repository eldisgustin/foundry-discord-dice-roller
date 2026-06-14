import { DiceRoll } from "@dice-roller/rpg-dice-roller";
import { EmbedBuilder } from "@discordjs/builders";
import {
  type CacheType,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from "discord.js";
import { getAbilityModifier } from "../../dnd/abilities.ts";
import { getActorProficiency } from "../../dnd/actor.ts";
import { getCheckLabel, type CheckValue } from "../../dnd/checks.ts";
import { formatNumberNotation } from "../../dnd/format.ts";
import { Scalings } from "../../dnd/scalings.ts";
import { getSkillModifier as getPbModifier } from "../../dnd/skills.ts";
import { prisma } from "../../program/database.ts";

export const roll = {
  slash: new SlashCommandBuilder()
    .setName("roll")
    .setDescription("Rolls for a given character")
    .addStringOption((option) =>
      option
        .setName("character")
        .setDescription("Character to roll as")
        .setAutocomplete(true)
        .setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName("check")
        .setDescription("what check to perform")
        .setAutocomplete(true)
        .setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName("modifiers")
        .setDescription("OPtional modifier to add/substract"),
    ),
  async handler(interaction: ChatInputCommandInteraction<CacheType>) {
    const actor = await prisma.actor.findFirst({
      where: {
        name: interaction.options.getString("character")!,
        owner: interaction.user.id,
      },
    });
    if (!actor) {
      return await interaction.reply(
        "Looks like you don't own this character!",
      );
    }
    const check = interaction.options.getString("check") as CheckValue;
    const extra = interaction.options.getString("modifier") ?? "";
    const dice = interaction.options.getString("dice") ?? "1d20";
    const scaling = Scalings[check];
    const abilityValue = (actor.abilities as Record<string, number>)[scaling];
    const proficiency = getActorProficiency(actor, check);
    const pbModifier = getPbModifier({
      level: actor.level,
      proficiency: proficiency,
    });
    const abilityModifier = getAbilityModifier(abilityValue);
    const notation = [
      dice,
      formatNumberNotation(abilityModifier),
      formatNumberNotation(pbModifier),
      extra,
    ]
      .filter(Boolean)
      .join(" ");

    const result = new DiceRoll(notation);
    const embed = new EmbedBuilder();

    embed.setAuthor({
      name: actor.name,
      iconURL: `https://foundry.colmillodecobre.chinga.casa/${actor.avatar_url}`,
    });
    embed.addFields({
      name: `${getCheckLabel(check)} roll`,
      value: `\`${result.notation}\``,
    });
    embed.addFields({
      inline: true,
      name: "Result",
      value: `\`${result.total}\``,
    });

    await interaction.reply({
      embeds: [embed],
      body: { name: actor.name, avatar_url: actor.avatar_url },
    });
  },
};
