import { Command } from "../structures/Command";
import { VorteClient } from "../structures/VorteClient";
import { Message } from "discord.js";

export class Help extends Command {
  constructor(bot: VorteClient) {
    super(bot, {
      name: "help",
      category: "Information",
      cooldown: 5000,
      aliases: ["h"]
    })
  }
  run (message: Message) {
    message.channel.send(`Hello`)
  }
};