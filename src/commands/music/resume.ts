import { Message } from "discord.js";
import { Command } from "../../structures/Command";
import { VorteGuild } from "../../structures/VorteGuild";

export default class extends Command {
  public constructor() {
    super("resume", {
      category: "Music",
      cooldown: 0
    });
  }

  public async run({ guild, member, channel }: Message, query: string[], gui: VorteGuild) {
    const player = this.bot.andesite!.players.get(guild!.id);

    if (!player) return channel.send(`There's nothing being played`);
    if (!player.paused) return channel.send(`Bot is playing music`)

    await player.resume();
    channel.send(`Successfully resumed the music`)
  }
}