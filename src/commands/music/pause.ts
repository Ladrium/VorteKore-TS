import { Command } from "../../structures/Command";
import { VorteClient } from "../../structures/VorteClient";
import { Message } from "discord.js";
import { VorteGuild } from "../../structures/VorteGuild";

export default class extends Command {
  public constructor() {
    super("pause", {
      aliases: ["stop"],
      category: "Music",
      cooldown: 0
    });
  }

  public async run({ guild, member, reply, channel }: Message, query: string[], gui: VorteGuild) {
    const player = this.bot.andesite.players!.get(guild!.id);

    if (!player) return reply(` There's nothing being played`);
    if (player.paused) return reply(` Nothing is being played, use  ${gui.prefix}resume to resume or ${gui.prefix}play <query> to play`)

    await player.pause()
    channel.send(`Successfully paused the music`)
  }
}