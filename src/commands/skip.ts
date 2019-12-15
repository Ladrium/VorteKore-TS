import { Command } from "../structures/Command";
import { VorteClient } from "../structures/VorteClient";
import { Message } from "discord.js";
import { checkDJ, checkPermissions } from "../util";

export class Cmd extends Command {
  constructor(bot: VorteClient) {
    super(bot, {
      name: "skip",
      category: "Music",
      cooldown: 0
    })
  }
  async run({ guild, member, reply, channel }: Message, query: string[]) {
    if (!checkDJ(member!) && !checkPermissions(member!, "ADMINISTRATOR")) return channel.send("You don't have permissions for this command!");
    const player = this.bot.player!.lavalink!.get(guild!.id);
    const queue = this.bot.player!.queue!.getQueue(guild!)!;
    if (!player || !player.playing) return channel.send("The bot isn't playing any music yet!")
    queue.queue = queue.queue.slice(1);
    if (!queue.queue[0]) return this.bot.player!.lavalink!.leave(guild!.id);
    player.play(queue.queue[0].track)
  }
}