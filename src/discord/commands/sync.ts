import axios from "axios";
import consola from "consola";
import {
  MessageFlags,
  SlashCommandBuilder,
  type CacheType,
  type ChatInputCommandInteraction,
} from "discord.js";
import { parseActor } from "../../dnd/foundryvtt.ts";
import { prisma } from "../../program/database.ts";

export const sync = {
  slash: new SlashCommandBuilder()
    .setName("sync")
    .setDescription("Adds or updates a foundry character")
    .addAttachmentOption((option) =>
      option
        .setName("input")
        .setDescription("Actor file from foundryvtt")
        .setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName("alias")
        .setDescription("Friendly name to display when rolling this character"),
    ),

  async handler(interaction: ChatInputCommandInteraction<CacheType>) {
    const { options } = interaction;
    const json = options.getAttachment("input");
    const alias = options.getString("alias");

    if (!json) {
      return await interaction.reply("This is not a valid .json file");
    }

    consola.debug(json.url);
    consola.debug(json.contentType);

    // TODO: Validate that it's a reported JSON

    const file = await axios.get(json.url);

    consola.debug(file.data);

    const foundryActor = parseActor(file.data);
    const ownerid = interaction.user.id;
    const existing = await prisma.actor.findFirst({
      where: { owner: ownerid, id: foundryActor.id },
    });
    const data = {
      id: foundryActor.id,
      owner: ownerid,
      alias: alias ?? existing?.alias ?? foundryActor.name,
      avatar_url: foundryActor.avatarUrl,
      abilities: foundryActor.abilities,
      proficiencies: foundryActor.proficiencies,
      level: foundryActor.level,
      name: foundryActor.name,
      flags_hasjackofalltrades: foundryActor.hasJackOfAllTrades,
    };

    const actor = await prisma.actor.upsert({
      where: { owner: ownerid, id: foundryActor.id },
      create: data,
      update: data,
    });

    await interaction.reply({
      content: `"${actor.name}" has been synced`,
      flags: MessageFlags.Ephemeral,
    });
  },
};
