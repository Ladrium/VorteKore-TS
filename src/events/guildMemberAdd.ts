import { VorteClient } from "../structures/VorteClient";
import { VorteGuild } from "../structures/VorteGuild";
import VorteEmbed from "../structures/VorteEmbed";
import { GuildMember, TextChannel } from "discord.js";

export = (bot: VorteClient, mem: GuildMember, guild: VorteGuild) => {
  const { channel, enabled, message } = guild.welcome;
  if (!enabled) return;
  (mem.guild.channels.get(channel.id)as TextChannel).send(message);

}