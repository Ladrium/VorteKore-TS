import { Command } from "../structures/Command";
import { VorteClient } from "../structures/VorteClient";
import { Message, TextChannel, Guild } from "discord.js";
import VorteEmbed from "../structures/VorteEmbed"
import { VorteGuild } from "../structures/Guild"
export class Cmd extends Command {
  constructor(bot: VorteClient) {
    super(bot, {
      name: "ban",
      category: "Information",
      cooldown: 5000
    })
  }
  run(message: Message, args: string[], guild: VorteGuild) {
    message.delete().catch()
    if (!args[0]) return new VorteEmbed(message).baseEmbed().setDescription("Please provide a user to ban");
    let member = message.mentions.members!.first() || message.guild!.members.find((r: { displayName: string; }) => {
      return r.displayName === args[0];
    }) || message.guild!.members.get(args[0]);
    if (!member) return message.channel.send("Invalid username|id provided")
    if (!args[1]) {
      return new VorteEmbed(message).baseEmbed().setDescription("Please provide a specific reason.")
    }
    const reason = args.slice(2).join(" ");
    member!.ban({
      reason: reason
    });
    console.log(VorteGuild)
    message.channel.send("Succesfully banned the user.")
    const logChannel = member.guild.channels.find(channel => channel.id == "632460737146519552");
    if (!logChannel) return;
    if (!((logChannel): logChannel is TextChannel => logChannel.type === 'text')(logChannel)) return;
    logChannel.send(
      new VorteEmbed(message).baseEmbed().setTimestamp().setDescription(
        `**>** Executor: ${message.author.tag} (${message.author.id})
        **>** Banned: ${member.user.tag} (${member.user.id})
        **>** Reason: ${reason}
        `
      )
    )

  }
};