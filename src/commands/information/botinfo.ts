import ms from "ms";
import { Command, VorteEmbed, VorteMessage } from "../../lib";
import { get } from "../../util";

export default class extends Command {
  public constructor() {
    super("botinfo", {
      aliases: ["status"],
      category: "Information",
      cooldown: 0
    });
  }

  public async run(message: VorteMessage) {
    const emb = new VorteEmbed(message).baseEmbed()
      .setAuthor(`${this.bot.user!.username} Bot Info`, this.bot.user!.displayAvatarURL())
      .setDescription(`Hello, I'm ${this.bot.user!.username}!, I am a public bot. If you wish to check out the commands I have, please do \`!help\`.`)
      .addField("\u200B", this.buildStats());
    const commits = await this.getCommits();
    if (commits) emb.addField("Github Commits", commits);
    return message.channel.send(emb);
  }

  private buildStats() {
    let time = ms(this.bot.uptime!, { long: true }), fieldValue = "";
    fieldValue += `**Guild Count**: ${this.bot.guilds.size}\n`;
    fieldValue += `**Total Users**: ${this.bot.users.size}\n`;
    fieldValue += `**Total Commands**: ${this.bot.commands.size}\n`;
    fieldValue += `**Uptime:** ${time}\n`;
    fieldValue += `\n[Invite](http://bit.ly/VorteKore) • [Repository](https://github.com/ChaosPhoe/VorteKore-TS) • [Vote](https://top.gg/bot/634766962378932224)`;
    return fieldValue
  }

  private async getCommits() {
    let commits = await get<GithubCommits.RootCommit[]>("https://api.github.com/repos/ChaosPhoe/VorteKore-TS/commits"), str = "";
    if (!commits.data) {
      console.error(commits.error);
      return false;
    }

    for (const { sha, html_url, commit, author } of commits.data.filter(c => c.committer.type.ignoreCase("user")).slice(0, 5))
      str += `[\`${sha.slice(0, 7)}\`](${html_url}) ${commit.message} - ${author.login}\n`;

    return str;
  }
}