import { Message } from "discord.js";
import { Command, VorteEmbed } from "../../lib";
import { member } from "../../models/member";
import { paginate } from "../../util";

export default class extends Command {
  public constructor() {
    super("leaderboard", {
      aliases: ["lb"],
      category: "Economy",
      cooldown: 500
    })
  }

  public async run(message: Message, [selected]: any) {
    let members: any[] = (await member.find({ guildID: message.guild!.id }));
    members = members.sort((a: { xp: number; }, b: { xp: number; }) => b.xp - a.xp);

    let { items, page } = paginate(members, selected),
      str = "", index = (page - 1) * 10;

    for (const member of items) {
      const user = this.bot.users.get(member.id)!;
      str += `${++index}. ${user.username} : ${member.level} [${member.xp}]\n`;
    }
    str += `Page : ${page}`;

    const leaderboardEmbed = new VorteEmbed(message)
      .baseEmbed()
      .setAuthor("Leaderboard", message.author.displayAvatarURL())
      .setDescription("\`\`\`prolog\n" + str + "\`\`\`")
    return message.channel.send(leaderboardEmbed);
  }
}