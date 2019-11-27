import { Command } from "../structures/Command";
import { VorteClient } from "../structures/VorteClient";
import { Message, TextChannel } from "discord.js";
import VorteEmbed from "../structures/VorteEmbed";
import { VorteGuild } from "../structures/VorteGuild";
import { checkPermissions } from "../util";

export class Cmd extends Command {
  constructor(bot: VorteClient) {
    super(bot, {
      name: "warn",
      category: "Information",
      cooldown: 5000
    })
  }
  run(message: Message, args: string[], guild: VorteGuild) {
    if (!checkPermissions(message.member!, "KICK_MEMBERS")) return message.channel.send(new VorteEmbed(message).errorEmbed("Missing Permissions!"));
    if (!args[0]) return message.channel.send(new VorteEmbed(message).baseEmbed().setDescription("Please provide a user to warn."));
    const member = message.mentions.members!.first() || message.guild!.members.find(r => r.displayName === args[0] || r.id === args[0]);
    const reason = args.slice(1).join(" ") || "No Reason.";

    if (!member) return message.channel.send(new VorteEmbed(message).baseEmbed().setDescription("Couldn't find that user!"));
    member.user.send(`You have been warned due to **${reason}**`)
    const { channel, enabled } = guild.getLog("warn");
    if (!enabled) return;
    guild.increaseCase()
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