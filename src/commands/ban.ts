import { Command } from "../structures/Command";
import { VorteClient } from "../structures/VorteClient";
import { Message, TextChannel, Guild } from "discord.js";
import VorteEmbed from "../structures/VorteEmbed"
import { VorteGuild } from "../structures/VorteGuild"
export class Cmd extends Command {
  constructor(bot: VorteClient) {
    super(bot, {
      name: "ban",
      category: "Moderation",
      cooldown: 0
    })
  }
  run(message: Message, [mem, ...reason]: any, guild: VorteGuild) {
    
    message.delete()
    if (!mem) return message.channel.send(new VorteEmbed(message).baseEmbed().setDescription("Please provide a user to ban"));
    const member = message.mentions.members!.first() || message.guild!.members.find((r: { displayName: string; }) => {
      return r.displayName === mem;
    }) || message.guild!.members.get(mem);
    if (!member) return message.channel.send("Couldn't find that user!");
    if (message.author.id === member.user.id) return message.channel.send(new VorteEmbed(message).baseEmbed().setDescription("You can't ban yourself"));
    if (message.member!.roles.highest <= member.roles.highest) return message.channel.send(new VorteEmbed(message).baseEmbed().setDescription("The user has higher role than you."))
    reason = reason[0] ? reason.join(" ") : "No reason";
    member!.ban({ reason: reason });
    guild.increaseCase();
    message.channel.send("Succesfully banned the user.")

    const { channel, enabled } = guild.getLog("ban")

    if (!enabled) return;
    const logChannel = member.guild.channels.find((c: { id: string; }) => c.id == channel.id) as TextChannel;
    logChannel.send(
      new VorteEmbed(message)
        .baseEmbed()
        .setTimestamp()
        .setTitle(`Moderation: Member Ban [Case ID: ${guild.case}] `)
        .setDescription(
        `**>**Executor: ${message.author.tag} (${message.author.id})
        **>**Banned: ${member.user.tag} (${member.user.id})
        **>**Reason: ${reason}
        `
      )
      
    )
  }
};