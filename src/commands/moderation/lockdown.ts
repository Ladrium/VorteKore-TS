
import { GuildChannel, TextChannel } from "discord.js";
import { Command, VorteEmbed, VorteMessage } from "../../lib";
import ms = require("ms");

export default class extends Command {
  public constructor() {
    super("lockdown", {
      category: "Moderation",
      aliases: ["ld"],
      cooldown: 5000,
      description: "Lockdowns a channel",
      example: "!lockdown 10m time to sleep",
      userPermissions: ["MANAGE_CHANNELS"],
      botPermissions: ["MANAGE_CHANNELS"],
      channel: "guild",
      usage: "<duration> [reason]"
    });
  }

  public async run(message: VorteMessage, args: string[]) {
    const chan = message.channel as GuildChannel;

    if (!args[0]) return message.sem("Please provide a reason to lockdown this channel.", { type: "error" });
    if (['release', 'unlock', 'remove'].includes(args[0])) {
      chan.overwritePermissions({
        permissionOverwrites: [
          {
            id: message.guild!.id,
            allow: ['SEND_MESSAGES']
          }
        ]
      });
    } else {
      const time = ms(args[0]);
      if (!time) return message.sem("Unable to resolve the time");

      const reason = args.slice(2).join(" ");
      await chan.overwritePermissions({
        permissionOverwrites: [
          {
            id: message.guild!.id,
            deny: ['SEND_MESSAGES']
          }
        ],
        reason: reason ? reason : `No reason provided - ${message.author.tag}`
      });
      setTimeout(() => {
        chan.overwritePermissions({
          permissionOverwrites: [
            {
              id: message.guild!.id,
              allow: ['SEND_MESSAGES']
            }
          ],
          reason: reason ? reason : `No reason provided - ${message.author.tag}`
        });
        message.sem("Successfully unlocked the channel.");
      }, time);


      const _case = await this.bot.database.newCase(message.guild!.id, {
        type: "lockdown",
        subject: chan.id,
        reason,
        moderator: message.author.id
      });

      if (!message._guild!.logs.channel || !message._guild!.logs.lockdown) return;

      const logChannel = message.guild!.channels.get(message._guild!.logs.channel) as TextChannel;
      logChannel.send(new VorteEmbed(message).baseEmbed()
        .setAuthor(`Moderation: Channel Lockdown (Case ID: ${_case.id})`, message.author.displayAvatarURL())
        .setDescription([
          `**>** Staff: ${message.author.tag} (${message.author.id})`,
          `**>** Channel: ${chan} (${chan.id})`,
          `**>** Reason: ${reason === undefined ? `No reason provided` : reason}`
        ].join("\n"))
      );
    }
  }
};