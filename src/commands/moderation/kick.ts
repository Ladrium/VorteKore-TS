import { Message, TextChannel } from "discord.js";
import { Command, VorteEmbed, VorteGuild, VorteMessage } from "../../lib";
import { checkPermissions } from "../../util";

export default class extends Command {
  constructor() {
    super("kick", {
      category: "Moderation",
      description: "Kicks a member",
      example: "!ban @2D mass pinging",
      userPermissions: ["KICK_MEMBERS"],
      channel: "guild",
      usage: "<member> [reason]"
    })
  }
  public async run(message: VorteMessage, [mem, ...reason]: any, guild: VorteGuild = message.getGuild()!) {
    if (message.deletable) await message.delete();

    if (!mem) return message.sem("Please provide a user to ban");
    const member = message.mentions.members!.first() || message.guild!.members.find((r: { displayName: string; }) => {
      return r.displayName === mem;
    }) || message.guild!.members.get(mem);

    if (!member) return message.channel.send("Couldn't find that user!");
    if (message.author.id === member.user.id) return message.sem("You can't ban yourself");
    if (message.member!.roles.highest <= member.roles.highest) return message.sem("The user has higher role than you.")

    reason = reason[0] ? reason.join(" ") : "No Reason";

    try {
      await member.kick(reason);
      message.sem("Succesfully kicked the member.");
    } catch (error) {
      console.error(`kick command`, error);
      return message.sem(`Sorry, we ran into an error.`, { type: "error" });
    }

    const { channel, enabled } = guild.getLog("ban");
    guild.increaseCase();
    if (!enabled) return;

    const logChannel = member.guild.channels.get(channel.id) as TextChannel;
    logChannel.send(
      new VorteEmbed(message).baseEmbed().setTimestamp()
        .setAuthor(`Moderation: Channel Lockdown (Case ID: ${guild.case})`, message.author.displayAvatarURL())
        .setDescription([
          `**>** Staff: ${message.author.tag} (${message.author.id})`,
          `**>** Kicked: ${member.user.tag} (${member.user.id})`,
          `**>** Reason: ${reason ? reason : "No reason"}`
        ].join("\n"))
    );
  }
};