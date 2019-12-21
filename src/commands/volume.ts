import { Command, VorteClient, VorteEmbed } from "../structures";
import { Message } from "discord.js";
import { checkDJ, checkPermissions } from "../util";

export class Cmd extends Command {
  constructor(bot: VorteClient) {
    super(bot, {
      name: "volume",
      aliases: ["vol"],
      category: "Music",
      cooldown: 0
    });
  }
  run(message: Message, [volume]: any) {
    if (!checkDJ(message.member!) && !checkPermissions(message.member!)) return message.reply("Not enough permissions!");
    if (!message.guild!.me!.voice) return message.reply("I'm not playing anything!");
    if (!message.member!.voice || message.member!.voice.channelID !== message.guild!.me!.voice.channelID)
      return message.reply("You need to be in the same voice channel as the bot!");

    const player = this.bot!.player!.lavalink!.get(message.guild!.id);
    if (!player || !player.playing) return message.reply("Not playing anything right now!");
    
    if (isNaN(volume) || volume.includes("-") || volume.includes(".") || volume > 100 || volume < 1) return message.reply("Please return a valid number between 1-100");
    volume = parseInt(volume);
    player.volume(volume);
    message.channel.send(`Set the Volume to: \`${volume}\``)
  }
}