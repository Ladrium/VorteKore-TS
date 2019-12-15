import { Command } from "../structures/Command";
import { VorteClient } from "../structures/VorteClient";
import { Message } from "discord.js";
import { VorteGuild } from "../structures/VorteGuild";

export class Cmd extends Command {
  constructor(bot: VorteClient) {
    super(bot, {
      name: "pause",
      aliases: ["stop"],
      category: "Music",
      cooldown: 0
    })
  }
  async run({ guild, member, reply, channel }: Message, query: string[], gui: VorteGuild) {
    const player = this.bot.player!.lavalink!.get(guild!.id);
    if (!player) return reply(` There's nothing being played`);
    if (player.paused) return reply(` Nothing is being played, use  ${gui.prefix}resume to resume or ${gui.prefix}play <query> to play`)
    player!.pause()
    channel.send(`Successfully paused the music`)

  }
}