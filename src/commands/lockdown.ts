
import { Command } from "../structures/Command";
import { VorteClient, VorteEmbed } from "../structures";
import { Message, GuildChannel, TextChannel } from "discord.js";
import { VorteGuild } from "../structures/VorteGuild";
import ms = require("ms");
import { checkPermissions } from "../util";

export class Cmd extends Command {
  constructor(bot: VorteClient) {
    super(bot, {
      name: "lockdown",
      category: "Moderation",
      aliases: ["ld"],
      cooldown: 5000,
      description: "Lockdowns a channel",
      example: "!lockdown 10m time to sleep"
    })
  }
  run(message: Message, args: string[], guild: VorteGuild) {
    if (!checkPermissions(message.member!, "MANAGE_CHANNELS")) return message.channel.send(new VorteEmbed(message).errorEmbed("Missing Permissions!"));

    const chan = message.channel as GuildChannel;

    if (!args[0]) return message.channel.send(new VorteEmbed(message).baseEmbed().setDescription("Please provide a reason to lockdown this channel."));
    if (args[0].toLowerCase() === 'release' || 'unlock' || 'remove') {
      chan.overwritePermissions({
        permissionOverwrites: [
          {
            id: message.guild!.id,
            allow: ['SEND_MESSAGES']
          }
        ]
      })
    } else {
      const time = ms(args[0]);
      if (!time) return message.channel.send(new VorteEmbed(message).baseEmbed().setDescription("Unable to resolve the time"));
      const reason = args.slice(2).join(" ");
      chan.overwritePermissions({
        permissionOverwrites: [
          {
            id: message.guild!.id,
            deny: ['SEND_MESSAGES']
          }
        ],
        reason: reason ? reason : `No reason provided - ${message.author.tag}`
      })
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
        message.channel.send("Successfully unlocked the channel.")
      }, time);
      const { channel, enabled } = guild.getLog("lockdown");
      if (!enabled) return;
      guild.increaseCase()
      const cha = message.guild!.channels.get(channel.id) as TextChannel;
      cha.send('Succesfully locked the channel')
    }
  }
};