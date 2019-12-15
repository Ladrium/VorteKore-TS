import { Command, VorteClient, VorteEmbed, VorteGuild } from "../structures";
import { Message } from "discord.js";

export class Cmd extends Command {
  constructor(bot: VorteClient) {
    super(bot, {
      name: "botinfo",
      aliases: ["bi"],
      category: "Information",
      cooldown: 0
    });
  }
  async run(message: Message, []: any, guild: VorteGuild) {
    const emb = new VorteEmbed(message).baseEmbed()
      .setTitle(`${this.bot.user!.username} Bot Info`)
      .setDescription(`Hello, I'm ${this.bot.user!.username}!, I am a public bot. If you wish to check out the commands I have, please do ${guild.prefix}help. If you want to invite this bot to your server, Please do: ${guild.prefix}invite\n\n**Uptime:** ${this.bot.uptime}\n**Total User Count:** ${message.guild?.memberCount}\nTotal Commands Count: ${this.bot.commands.size}\n\n[Invite bot to your server](http://bit.ly/2EmfskO)`)
  }
}