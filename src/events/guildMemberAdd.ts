import { VorteGuild, VorteEmbed, VorteClient } from "../structures";
import { GuildMember, TextChannel, Role, RoleResolvable, Message } from "discord.js";
import { formatString, findRole } from "../util";

export = async (bot: VorteClient, member: GuildMember) => {
  const guild = await new VorteGuild(member.guild!);
  const { channel, enabled, message } = guild.welcome;
  if (!enabled) return;
  const welcomeChannel = (member.guild.channels.get(channel) as TextChannel);
  if (!welcomeChannel) return;

  welcomeChannel.send(formatString(message, member));

}