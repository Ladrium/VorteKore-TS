import { TextChannel } from "discord.js";
import { Command, VorteEmbed, VorteMessage } from "../../lib";

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
  public async run(message: VorteMessage, [mem, ...reason]: any) {
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

    const _case = await this.bot.database.newCase(message.guild!.id, {
      type: "kick",
      subject: member.id,
      reason,
      moderator: message.author.id
    });

    if (!message._guild!.logs.channel || !message._guild!.logs.kick) return;

    const logChannel = member.guild.channels.get(message._guild!.logs.channel) as TextChannel;
    logChannel.send(
      new VorteEmbed(message).baseEmbed().setTimestamp()
        .setAuthor(`Moderation: Channel Lockdown (Case ID: ${_case.id})`, message.author.displayAvatarURL())
        .setDescription([
          `**>** Staff: ${message.author.tag} (${message.author.id})`,
          `**>** Kicked: ${member.user.tag} (${member.user.id})`,
          `**>** Reason: ${reason ? reason : "No reason"}`
        ].join("\n"))
    );
  }
};