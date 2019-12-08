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
    let queue = this.bot.player?.queue
    if (!queue) return reply(`There's nothing in the queue!`);
    let player = this.bot.player!.lavalink!.get(guild!.id);
    player!.stop();
  }
}