import { VorteClient } from "../structures/VorteClient";
import { VorteGuild } from "../structures/VorteGuild";
import VorteEmbed from "../structures/VorteEmbed";
import { GuildMember, TextChannel } from "discord.js";

export = (bot: VorteClient, mem: GuildMember, guild: VorteGuild) => {
  const { channel, enabled, message } = guild.leave;
  if (!enabled) return;
  const m = message as String;
  (mem.guild.channels.get(channel.id) as TextChannel).send(m.replace('{user}', `${mem}`))
}
