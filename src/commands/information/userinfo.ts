import { Message } from "discord.js";
import { VorteEmbed, VorteGuild, VorteMember, Command } from "../../lib";
import { findMember } from "../../util";

export default class extends Command {
  public constructor() {
    super("userinfo", {
      category: "Information",
      cooldown: 5000,
      aliases: ["whois", "ui"],
      description: "!ui @user"
    })
  }
  async run(message: Message, [mem]: any, guild: VorteGuild) {
    const member = await findMember(message, mem) || message.member;
    if (!member) return message.channel.send(`Unable to find that member!`);
    const thisMember = await new VorteMember(member.id, message.guild!.id)._init();
    const infoEmbed = new VorteEmbed(message).baseEmbed().setDescription(
      `**>** Name: ${member!.user.tag}
     **>** Joined At: ${member!.joinedAt}
     **>** Created At: ${member.user.createdAt}
     **>** Presence: ${member!.presence.status}
     **>** Hoist Role: ${member.roles.hoist}
     **>** Roles: ${member!.roles.array().toString().replace('@everyone', '')}
     **>** Level: ${thisMember.level}
     **>** XP: ${thisMember.xp}/${2 * 75 * thisMember.level}
     **>** Coins: ${thisMember.coins}`
    )
      .setThumbnail(member.user.displayAvatarURL())
    message.channel.send(infoEmbed);
  }
};