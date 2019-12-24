import { Message } from "discord.js";
import ms from "ms";
import { Command, VorteEmbed, VorteGuild } from "../../lib";

export default class extends Command {
  public constructor() {
    super("botinfo", {
      aliases: ["status"],
      category: "Information",
      cooldown: 0
    });
  }

  public run(message: Message, []: any, guild: VorteGuild) {
    const time = ms(this.bot.uptime!, { long: true })
    const emb = new VorteEmbed(message).baseEmbed()
      .setTitle(`${this.bot.user!.username} Bot Info`)
      .setDescription(`Hello, I'm ${this.bot.user!.username}!, I am a public bot. If you wish to check out the commands I have, please do ${guild.prefix}help. If you want to invite this bot to your server, Please do: ${guild.prefix}invite`)
      .addField("\u200B", `**Guild Count**: ${this.bot.guilds.size}\n**Total Users**: ${this.bot.users.size}\n**Total Commands**: ${this.bot.commands.size}\n**Uptime:** ${time}\n\n[Invite bot to your server](http://bit.ly/VorteKore)`);

    message.channel.send(emb);
  }
}