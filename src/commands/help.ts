import { Command } from "../structures/Command";
import { VorteClient } from "../structures/VorteClient";

export class Help extends Command {
  constructor(bot: VorteClient) {
    super(bot, {
      name: "help",
      category: "Information",
      cooldown: 5000
    })
  }
};