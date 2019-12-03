import { VorteClient } from "../structures/VorteClient";
import { Guild } from "discord.js";
import { VorteGuild } from "../structures/VorteGuild";

export = async (bot: VorteClient, guild: Guild) => {
  await new VorteGuild()._load(guild);
};