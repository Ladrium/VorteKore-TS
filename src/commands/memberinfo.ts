import { Command } from "../structures/Command";
import { VorteClient } from "../structures/VorteClient";
import { Message } from "discord.js";
import VorteEmbed from "../structures/VorteEmbed";

export class Cmd extends Command {
  constructor(bot: VorteClient) {
    super(bot, {
      name: "memberinfo",
      category: "Utility",
      cooldown: 5000,
      aliases: ["mi", "ui", "meminfo"]
    })
  }
  run(message: Message, args: string[]) {
    new VorteEmbed(message).baseEmbed().setDescription(
      `**>** Name: ${message.author.tag}
     **>** Joined At: ${message.member!.joinedAt}
     **>** Presence: ${message.member!.presence.status}
     **>** Roles: ${message.member!.roles}` 
    )
  }
};