import { Command } from "../structures/Command";
import { VorteClient } from "../structures/VorteClient";
import { Message } from "discord.js";
import { VorteGuild } from "../structures/VorteGuild";

export class Cmd extends Command {
  constructor(bot: VorteClient) {
    super(bot, {
      name: "setup",
      category: "Moderation",
      cooldown: 200
    })
  }
  run(message: Message, args: string[], guild: VorteGuild) {

  }
}