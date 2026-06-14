import consola from "consola";
import { Client, Events, GatewayIntentBits, REST, Routes } from "discord.js";
import { type Autocomplete, autocomplete } from "../discord/autocomplete.ts";
import { type Command, commands } from "../discord/commands.ts";

export async function updateAutocomplete(token: string, client_id: string) {
  const rest = new REST({ version: "10" }).setToken(token);

  try {
    const slashes = Object.values(commands).map(({ slash }) => slash);

    await rest.put(Routes.applicationCommands(client_id), {
      body: slashes,
    });

    consola.success("Reloaded application (/) commands");
    consola.info(
      "Slashes",
      slashes.map(({ name }) => `/${name}`),
    );
  } catch (error) {
    consola.error(error);
  }
}

export async function startClient(token: string) {
  const client = new Client({ intents: [GatewayIntentBits.Guilds] });

  client.on("ready", () => {
    if (!client.user) {
      consola.warn("Something's terribly wrong!");
      return;
    }
    consola.success(`Logged in as ${client.user.tag}!`);
  });

  client.on(Events.InteractionCreate, async (interaction) => {
    if (interaction.isChatInputCommand()) {
      try {
        const handler = commands[interaction.commandName as Command].handler;

        if (!handler) {
          consola.warn("No command named", interaction.commandName);
          return;
        }

        await handler(interaction);
      } catch (error) {
        consola.error("Failed to run command", error);
      }
    } else if (interaction.isAutocomplete()) {
      try {
        const focusedOption = interaction.options.getFocused(true);
        const handler = autocomplete[focusedOption.name as Autocomplete];

        if (!handler) {
          consola.warn("No autocomplete named", interaction.commandName);

          return;
        }

        await handler(interaction);
      } catch (error) {
        consola.error("Failed to autocomplete", error);
      }
    }
  });

  client.login(token);
}
