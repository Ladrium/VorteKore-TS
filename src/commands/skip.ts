import { Command } from "../structures/Command";
import { VorteClient } from "../structures/VorteClient";
import { Message } from "discord.js";
import message = require("../events/message");

export class Cmd extends Command {
  constructor(bot: VorteClient) {
    super(bot, {
      name: "skip",
      category: "Music",
      cooldown: 0
    })
  }
  async run({ guild, member, reply, channel }: Message, query: string[]) {
    const player = this.bot.player!.lavalink!.get(guild!.id);
    const queue = this.bot.player!.queue!.getQueue(guild!)!;
    queue.queue = queue.queue.slice(1);
    const nextSong = queue.nextSong();
    if (!player) return reply("There's nothing being played.")
    player!.play(nextSong).on("end", (data: object) => {
      this.bot.emit("songEnd", data, player, queue, { guild, channel });
    });
  }
}