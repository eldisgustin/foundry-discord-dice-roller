import { config } from "./src/program/config.ts";

import { startClient, updateAutocomplete } from "./src/program/discord.ts";

updateAutocomplete(config.discord.token, config.discord.client_id);

startClient(config.discord.token);
