import { Command } from "../structures/Command";
import { VorteClient } from "../structures/VorteClient";
import { Message } from "discord.js";
import message = require("../events/message");
import { VorteGuild } from "../structures/VorteGuild";

export class Cmd extends Command {
  constructor(bot: VorteClient) {
    super(bot, {
      name: "resume",
      category: "Music",
      cooldown: 0
    })
  }
  async run({ guild, member, reply }: Message, query: string[], gui: VorteGuild) {
    const player = this.bot.player!.lavalink!.get(guild!.id);
    if (!player) return reply(` There's nothing being played`);
    if (player.playing) return reply(` Bot is playing music`)
    player!.pause(false)
    reply(`Successfully resumed the music`)
    
  }
}