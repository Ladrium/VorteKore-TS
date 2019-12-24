import { Message } from "discord.js";
import { Command, VorteClient, VorteEmbed, VorteGuild, VorteMember } from "../../lib";
import { paginate } from "../../util";
import { member } from "../../models/member";

export default class extends Command {
  public constructor() {
    super("leaderboard", {
      aliases: ["lb"],
      category: "Economy",
      cooldown: 500
    })
  }

  public async run(message: Message, [page = 1]: any) {
    let members: any[] = (await member.find({ guildID: message.guild!.id }));
    members = members.sort((a: { xp: number; }, b: { xp: number; }) => b.xp - a.xp);

    if (page > members.length) page = 1;

    let { items } = paginate(members, page, 10),
      str = "";

    for (const member of items) {
      const user = this.bot.users.get(member.id)!,
        xpPadding = items.reduce((base: number, _: VorteMember) => Math.max(base, String(_.xp).length), 0),
        levelPadding = items.reduce((base: number, _: VorteMember) => Math.max(base, String(_.level).length), 0);
      str += `[XP ${String(member.xp).padStart(xpPadding)} LVL ${String(member.level).padStart(levelPadding)}] : "${user.username}"\n`;
    }
    str += `Page : ${page}`;

    const leaderboardEmbed = new VorteEmbed(message)
      .baseEmbed()
      .setAuthor("Leaderboard", message.author.displayAvatarURL())
      .setDescription("\`\`\`prolog\n" + str + "\`\`\`")
    return message.channel.send(leaderboardEmbed);
  }
}