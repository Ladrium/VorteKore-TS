import { Command } from "../structures/Command";
import { VorteClient } from "../structures/VorteClient";
import { Message } from "discord.js";
import { checkDJ, checkPermissions } from "../util";

export class Cmd extends Command {
  constructor(bot: VorteClient) {
    super(bot, {
      name: "leave",
      aliases: ["stop"],
      category: "Music",
      cooldown: 0
    })
  }
  async run({ guild, member, reply, channel }: Message, query: string[]) {
    const player = this.bot.player!.lavalink!.get(guild!.id)!;
    if (!player) return reply(" Bot is not playing music");
    player.stop();
    channel.send("Successfully left the channel")
    
  }
}