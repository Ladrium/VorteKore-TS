import { Command } from "../structures/Command";
import { VorteClient } from "../structures/VorteClient";
import { Message } from "discord.js";

export class Cmd extends Command {
  constructor(bot: VorteClient) {
    super(bot, {
      name: "help",
      category: "Information",
      cooldown: 5000
    })
  }
  run(message: Message, args: string[]) {
    message.reply("Yahee")
  }
};