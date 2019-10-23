import { Command } from "../structures/Command";
import { VorteClient } from "../structures/VorteClient";
import { Message, GuildChannel } from "discord.js";
import VorteEmbed from "../structures/VorteEmbed"
import VorteGuild from "../models/guild"
export class Cmd extends Command {
  constructor(bot: VorteClient) {
    super(bot, {
      name: "ban",
      category: "Information",
      cooldown: 5000
    })
  }
  run(message: Message, args: string[]) {
    message.delete().catch()
    if (!args[0]) return new VorteEmbed(message).baseEmbed().setDescription("Please provide a user to ban");
    let member = message.mentions.members!.first() || message.guild!.members.find((r: { displayName: string; }) => {
      return r.displayName === args[0];
    }) || message.guild!.members.get(args[0]);
    if (!member) return message.channel.send("Invalid username/id provided")
    if (!args[1]) {
      return new VorteEmbed(message).baseEmbed().setDescription("Please provide a specific reason.")
    }
    Vor
    const reason = args.slice(2).join(" ");
    x: GuildChannel;
    member!.ban({
      reason: reason
    });
    message.channel.send("Succesfully banned the user.")
    message.guild!.channels.find(x => x.id === "632460737146519552")!.send(
      new VorteEmbed(message).baseEmbed().setDescription(
        `**>** Executor: ${message.author.tag} (${message.author.id})
        `
      )
    )
  }
};