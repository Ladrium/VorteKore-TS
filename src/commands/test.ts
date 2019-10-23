import { Command } from "../structures/Command";
import { VorteClient } from "../structures/VorteClient";
import { VorteGuild } from "../structures/VorteGuild";
import { Message } from "discord.js";

export class Cmd extends Command {
  constructor(bot: VorteClient) {
    super(bot, {
      name: "test",
      cooldown: 5000,
      category: "Developer"
    })
  }
  run(message: Message, args: string[], guild: VorteGuild) {
    guild.increaseCase();
  }
}