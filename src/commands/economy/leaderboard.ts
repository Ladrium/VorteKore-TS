import { Command, VorteEmbed, VorteMessage } from "../../lib";
import { ProfileEntity } from "../../models/Profile";
import { paginate } from "../../util";

export default class extends Command {
  public constructor() {
    super("leaderboard", {
      aliases: ["lb"],
      category: "Economy",
      cooldown: 500
    })
  }

  public async run(message: VorteMessage, [selected]: any) {
    let members: any[] = (await ProfileEntity.find({ guildId: message.guild!.id }));
    if (!members.length) return message.sem("Nothing to show ¯\\_(ツ)_/¯")
    members = members.sort((a, b) => b.xp - a.xp);

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
      .setDescription("\`\`\`\n" + str + "\`\`\`")
    return message.channel.send(leaderboardEmbed);
  }
}