import { Command } from "../structures/Command";
import { VorteClient } from "../structures/VorteClient";
import { Message, TextChannel } from "discord.js";
import VorteEmbed from "../structures/VorteEmbed";
import { VorteGuild } from "../structures/VorteGuild";

export class Cmd extends Command {
  constructor(bot: VorteClient) {
    super(bot, {
      name: "help",
      category: "Information",
      cooldown: 5000
    })
  }
  run(message: Message, args: string[], guild: VorteGuild) {
    if (!args[0]) return message.channel.send(new VorteEmbed(message).baseEmbed().setDescription("Please provide a user to warn."));
    const member = message.mentions.members!.first() || message.guild!.members.find(r => r.displayName === args[0] || r.id === args[0]);
    if (!member) return message.channel.send(new VorteEmbed(message).baseEmbed().setDescription("Couldn't find that user!"));
    const reason = args.slice(1).join(" ");
    if (!reason) return message.channel.send(new VorteEmbed(message).baseEmbed().setDescription("Please provide a specific reason"));
    member.user.send(`You have been warned due to **${reason}**`)
    guild.increaseCase()
    const { channel, enabled } = guild.getLog("warn");
    if (!enabled) return;
    const chan = message.guild!.channels.get(channel.id) as TextChannel;
    chan.send(
      new VorteEmbed(message)
        .baseEmbed()
        .setTitle(`Moderation: Warn [Case ID: ${guild.case}]`)
        .setDescription(`**>**Executor: ${message.author.tag} (${message.author.id})\n**>**Warn: ${member.user.tag} (${member.user.id})\n**>**Reason: ${reason}`)
        .setTimestamp()
      
    )
  }
};