import { VorteGuild } from "../../structures";
import { Event } from "../../structures/Event";
import { TextChannel, GuildMember } from "discord.js";
import { formatString } from "../../util";

export default class extends Event {
  public constructor() {
    super("new-member", {
      category: "guild",
      event: "guildMemberAdd"
    });
  }

  async run(member: GuildMember) {
    const guild = await new VorteGuild(member.guild!);
    const { channel, enabled, message } = guild.welcome;
    if (!enabled) return;
    const welcomeChannel = (member.guild.channels.get(channel) as TextChannel);
    if (!welcomeChannel) return;
  
    welcomeChannel.send(formatString(message, member));
  
  };
}