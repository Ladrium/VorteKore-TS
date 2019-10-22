import { Command } from "../structures/Command";
import { VorteClient } from "../structures/VorteClient";
import { Message } from "discord.js";
import * as conf from "../config"
import VorteEmbed from "../structures/VorteEmbed"
export class Cmd extends Command {
  constructor(bot: VorteClient) {
    super(bot, {
      name: "help",
      category: "Information",
      cooldown: 5000
    })
  }
  run(message: Message, args: string[]) {
    message.delete().catch()
    if (!args[0]) return new VorteEmbed(message).baseEmbed().setDescription("Please provide a user to ban");
    let member:  = message.mentions.members!.first() || message.guild!.members.find(r => r.displayName === args[0]) || message.guild!.members.get(args[0]);
    if (!member) return message.channel.send("Invalid username/id provided")
    if (!args[1]) {
      return new VorteEmbed(message).baseEmbed().setDescription("Please provide a specific reason.")
    }
    const reason = args.slice(2).join(" ");
    member!.ban({
      reason: reason
    });
    message.channel.send("Succesfully banned the user.")
    message.
  }
};