import { VorteGuild, Event } from "../../lib";
import { TextChannel, GuildMember } from "discord.js";
import { formatString } from "../../util";

export default class extends Event {
  public constructor() {
    super("member-leave", {
      category: "guild",
      event: "guildMemberRemove"
    });
  }

  async run(member: GuildMember) {
    const guild = await new VorteGuild(member.guild!);
    const { channel, enabled, message } = guild.leave;

    if (!enabled) return;

    const welcomeChannel = (member.guild.channels.get(channel) as TextChannel);
    if (!welcomeChannel) return;
    
    welcomeChannel.send(formatString(message, member));
  };
}