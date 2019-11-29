import { Command } from "../structures/Command";
import { VorteClient } from "../structures/VorteClient";
import { Message, TextChannel, Guild } from "discord.js";
import VorteEmbed from "../structures/VorteEmbed"
import { VorteGuild } from "../structures/VorteGuild"
import { checkPermissions } from "../util";

export class Cmd extends Command {
  constructor(bot: VorteClient) {
    super(bot, {
      name: "ban",
      category: "Moderation",
      cooldown: 0,
      description: "Kicks a member",
      example: "!ban @user mass pinging"
    })
  }
  run(message: Message, [mem, ...reason]: any, guild: VorteGuild) {
    if (!checkPermissions(message.member!, "KICK_MEMBERS")) return message.channel.send(new VorteEmbed(message).errorEmbed("Missing Permissions!"));

    message.delete()
    if (!mem) return message.channel.send(new VorteEmbed(message).baseEmbed().setDescription("Please provide a user to ban"));
    const member = message.mentions.members!.first() || message.guild!.members.find((r: { displayName: string; }) => {
      return r.displayName === mem;
    }) || message.guild!.members.get(mem);
    if (!member) return message.channel.send("Couldn't find that user!");
    if (message.author.id === member.user.id) return message.channel.send(new VorteEmbed(message).baseEmbed().setDescription("You can't ban yourself"));
    if (message.member!.roles.highest <= member.roles.highest) return message.channel.send(new VorteEmbed(message).baseEmbed().setDescription("The user has higher role than you."))
    reason = reason[0] ? reason.join(" ") : "No Reason";
    member.kick(reason);
    message.channel.send("Succesfully kicked the user.")
    
    const { channel, enabled } = guild.getLog("ban")
    
    if (!enabled) return;
    guild.increaseCase();
    const logChannel = member.guild.channels.get(channel.id) as TextChannel;
    logChannel.send(
      new VorteEmbed(message).baseEmbed().setTimestamp().setTitle(`Moderation: Member Kick [Case ID: ${guild.case}] `).setDescription(
        `**>**Executor: ${message.author.tag} (${message.author.id})
        **>**Kicked: ${member.user.tag} (${member.user.id})
        **>**Reason: ${reason ? reason : "No reason"}
        `
      )
    )
  }
};