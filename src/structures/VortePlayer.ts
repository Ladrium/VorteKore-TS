import { Player, PlayerOptions, Node } from "discord.js-andesite";
import { Queue } from "./Queue";
import { VorteEmbed } from ".";
import ms = require("ms");
import { Message } from "discord.js";

export class VortePlayer extends Player {
  public queue: Queue = new Queue(this);

  public constructor(node: Node, options: PlayerOptions) {
    super(node, options);
    (this.node.manager.client as any).queues
      .set(options.guildId);
  }
  
  public async ended(data: any, message: Message) {
    if (data.reason === "REPLACED") return;
    this.queue.next = this.queue.next.slice(1);
    const nextSong = this.queue.nextSong();
  
    if (!nextSong) return this.node.leave(this.guildId);
  
    await this.play(nextSong.track)
  
    message.channel.send(new VorteEmbed(message).baseEmbed()
      .setAuthor(`Up Next!`, message.author.displayAvatarURL())
      .setDescription(`**[${nextSong.info.title}](${nextSong.info.uri})**\n*${ms(nextSong.info.length)} long*`));
  }
}