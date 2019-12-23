import { Message } from "discord.js";
import { VorteEmbed } from "../../structures";
import { Command } from "../../structures/Command";

export default class extends Command {
  public constructor() {
    super("queue", {
      category: "Music",
      cooldown: 0,
      example: "!queue"
    });
  }
  
  public async run(message: Message, [time]: string) {
    const player = this.bot.andesite!.players!.get(message.guild!.id)!;
    if (!player || !player.playing) return message.channel.send("The bot isn't playing any music yet!");

    const queue = this.bot.queues.get(message.guild!.id)!;
    if (!queue.next[0]) return message.reply("Nothing queued right now!");

    const queueEmbed = new VorteEmbed(message).baseEmbed()
      .setTitle("Queue")
      .addField("Now Playing", `**[${queue.next[0].info.title}](${queue.next[0].info.uri})**`);
    if (queue.next[1])
      queueEmbed.setDescription(queue.next.slice(1, 10).map((song, i) => `${i + 1}. **[${song.info.title}](${song.info.uri})**`))
    message.channel.send(queueEmbed);
  }
}