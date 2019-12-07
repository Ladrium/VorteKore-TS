import { VorteClient } from "../structures/VorteClient";
import { VorteGuild } from "../structures/VorteGuild";
import VorteEmbed from "../structures/VorteEmbed";
import { GuildMember, TextChannel, Role, RoleResolvable, Message } from "discord.js";
import { formatString, findRole } from "../util";

export = async (bot: VorteClient, member: GuildMember) => {
  const guild = await new VorteGuild()._load(member.guild);
  const { channel, enabled, message } = guild.welcome;
  if (!enabled) return;
  const welcomeChannel = (member.guild.channels.get(channel) as TextChannel);
  if (!welcomeChannel) return;

  welcomeChannel.send(formatString(message, member));

}