import { Command, VorteClient, VorteGuild, VorteMember, VorteEmbed } from "../structures";
import { Message, GuildMember } from "discord.js";
import Member from "../models/member";
export class Cmd extends Command {
  constructor(bot: VorteClient) {
    super(bot, {
      name: "leaderboard",
      aliases: ["lb"],
      category: "Economy",
      cooldown: 500
    })
  }
  async run(message: Message, [page]: any, guild: VorteGuild) {
    let members: any = await Member.find({ guildID: message.guild!.id });
    members = members.sort((a: { xp: number; }, b: { xp: number; }) => b.xp - a.xp);
    let str = "";
    if (!page || isNaN(page) || page.includes("-")) page = 1;
    if (page == 1 || page > members.length / 10) {
      members.slice(0, 10).forEach((member: any, i: number) => {
        let username: string | GuildMember | undefined = message.guild!.members.get(member.id);
        username = username!.user.username || "Unknown";
        str += `${i + 1}. **${username}** - Level **${member.level}**, XP: **${member.xp}**\n`
      })
      str += "Page: 1"
    } else {
      page = Math.round(page);
      for (let i = page * 10 - 10; i < page * 10; i++) {
        let username: string | GuildMember | undefined = message.guild!.members.get(members[i].id);
        username = username!.user.username || "Unknown";
        str += `${i + 1}. **${username}** - Level **${members[i].level}**, XP: **${members[i].xp}**\n`
      }
      str += `Page: ${page}`;
    };
    const leaderboardEmbed = new VorteEmbed(message)
      .baseEmbed()
      .setTitle("Leaderboard")
      .setDescription(str)
    message.channel.send(leaderboardEmbed);
  }
}