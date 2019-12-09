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
  async run({ guild, member, reply }: Message, query: string[]) {
    const player = this.bot.player!.lavalink!.get(guild!.id);
    const song = this.bot.player!.queue!.getQueue(guild!)?.nextSong() as any
    player!.play(song);
  }
}