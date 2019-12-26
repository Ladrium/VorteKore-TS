import { Command, VorteEmbed, VorteMessage } from "../../lib";
import { findMember } from "../../util";
import { GuildMember } from "discord.js";

const Presence = {
  dnd: "Do Not Disturb",
  online: "Online",
  idle: "Idling",
  offline: "Offline"
}

export default class extends Command {
  public constructor() {
    super("userinfo", {
      category: "Information",
      cooldown: 5000,
      aliases: ["whois", "ui"],
      description: "!ui @user",
      channel: "guild"
    });
  }

  public async run(message: VorteMessage, [mem]: [string]) {
    const member = mem ? await findMember(message, mem) : message.member;
    if (!member) return message.channel.send(`Unable to find that member!`);
    
    const infoEmbed = new VorteEmbed(message).baseEmbed().setDescription([
      `**Name**: ${member.user.tag} (${member.id})`,
      `**Joined At**: ${member.joinedAt!.toLocaleDateString()}`,
      `**Created At**: ${member.user.createdAt.toLocaleDateString()}`,
      `**Status**: ${Presence[member.presence.status]}`,
      `**Game**: ${this.getGame(member)}`,
      `**Roles**: ${member.roles.sorted((a, b) => b.position - a.position).filter(r => r.name !== "@everyone").map(r => r).join(" ")}`, 
    ].join("\n"))
      .setThumbnail(member.user.displayAvatarURL({ size: 2048 }))
    message.channel.send(infoEmbed);
  }

  private getGame(member: GuildMember) {
    if (!member.presence.activity) return "None.";


  }
};