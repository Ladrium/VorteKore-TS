import { Command } from "../structures/Command";
import { VorteClient } from "../structures/VorteClient";
import { Message } from "discord.js";
import { VorteEmbed } from "../structures";

export class Cmd extends Command {
  constructor(bot: VorteClient) {
    super(bot, {
      name: "queue",
      category: "Music",
      cooldown: 0,
      example: "!queue"
    })
  }
  async run(message: Message, [time]: string) {
    const player = this.bot.player!.lavalink!.get(message.guild!.id)!;
    if (!player || !player.playing) return message.channel.send("The bot isn't playing any music yet!");

    const queue = this.bot.player!.queue.getQueue(message.guild!) || await new this.bot.player!.queue(message.guild!)._init();
    if (!queue.queue[0]) return message.reply("Nothing queued right now!");

    const queueEmbed = new VorteEmbed(message).baseEmbed()
      .setTitle("Queue")
      .addField("Now Playing", `**[${queue.queue[0].info.title}](${queue.queue[0].info.uri})**`);
    if(queue.queue[1])
      queueEmbed.setDescription(queue.queue.slice(1, 10).map((song, i) => `${i + 1}. **[${song.info.title}](${song.info.uri})**`))
    message.channel.send(queueEmbed);
  }
}