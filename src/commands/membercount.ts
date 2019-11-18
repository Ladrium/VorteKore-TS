import { Command } from "../structures/Command";
import { VorteClient } from "../structures/VorteClient";
import { Message } from "discord.js";
import VorteEmbed from "../structures/VorteEmbed";

export class Cmd extends Command {
  constructor(bot: VorteClient) {
    super(bot, {
      name: "si",
      category: "Utility",
      cooldown: 5000,
      aliases: ["serverinfo"]
    })
  }
  run(message: Message, args: string[]) {
    const guild = message.guild;
    new VorteEmbed(message).baseEmbed().setDescription(
    `**>** Member Count: ${guild?.memberCount}
     **>**`
    )
  }
};