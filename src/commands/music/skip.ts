import { Message } from "discord.js";
import { Command } from "../../structures/Command";
import { checkDJ, checkPermissions } from "../../util";

export default class extends Command {
  public constructor() {
    super("skip", {
      category: "Music",
      cooldown: 0
    })
  }

  public async run({ guild, member, reply, channel }: Message, query: string[]) {
    if (!checkDJ(member!) && !checkPermissions(member!, "ADMINISTRATOR")) return channel.send("You don't have permissions for this command!");

    const player = this.bot.andesite!.players!.get(guild!.id);
    const queue = this.bot.queues.get(guild!.id)!;

    if (!player || !player.playing) return channel.send("The bot isn't playing any music yet!")
    queue.next = queue.next.slice(1);

    if (!queue.next[0]) return player.node.leave(player.guildId);

    player.play(queue.next[0].track)
    channel.send(`Skipped the song, Now Playing: \`${queue.next[0].info.title}\``)
  }
}