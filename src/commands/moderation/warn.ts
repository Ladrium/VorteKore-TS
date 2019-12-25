import { TextChannel } from "discord.js";
import { VorteEmbed, VorteGuild, VorteMessage } from "../../lib";
import { Command } from "../../lib/classes/Command";

export default class extends Command {
  constructor() {
    super("warn", {
      category: "Moderation",
      cooldown: 5000,
      description: "Warns a member",
      usage: "<@member> [reason]",
      example: "!warn @Johna3212#1708 not following rules",
      channel: "guild",
      userPermissions: [ "MANAGE_GUILD" ]
    })
  }

  public async run(message: VorteMessage, args: string[], guild: VorteGuild = message.getGuild()!) {
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