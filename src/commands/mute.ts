import { Command } from "../structures/Command";
import { VorteClient } from "../structures/VorteClient";
import { Message, TextChannel } from "discord.js";
import { VorteGuild } from "../structures/VorteGuild";
import VorteEmbed from "../structures/VorteEmbed";
import { Mute } from "../structures/Mute";
import ms from "ms";
import { checkPermissions } from "../util";
export class Cmd extends Command {
  constructor(bot: VorteClient) {
    super(bot, {
      name: "mute",
      category: "Moderation",
      cooldown: 0,
      description: "Mutes a member",
      example: "!mute @user 10m"
    })
  }
  async run(message: Message, args: string[], guild: VorteGuild) {
    if (!checkPermissions(message.member!, "MANAGE_ROLES")) return message.channel.send(new VorteEmbed(message).errorEmbed("Missing Permissions!"));

    message.delete()
    if (!args[0]) return message.channel.send(new VorteEmbed(message).baseEmbed().setDescription("Please provide a user to mute"));
    if (!args[1]) return message.channel.send(new VorteEmbed(message).baseEmbed().setDescription("Please provide a time."));
    const member = message.mentions.members!.first() || message.guild!.members.find(r => r.displayName === args[0] || r.id === args[0]);
    if (!member) return message.channel.send(new VorteEmbed(message).baseEmbed().setDescription("Invalid member provided"))
    const time = ms(args[1]);
    if (!time) return message.channel.send(new VorteEmbed(message).baseEmbed().setDescription("Please provide a valid time"));
    const muteRole = message.guild!.roles.find((x) => x.name.toLowerCase() === "muted") ||
      await message.guild!.roles.create({
        data: {
          name: "Muted",
          color: "#1f1e1c"
        }
      })
    member.roles.add(muteRole);
    const mute = new Mute(member.id, message.guild!.id)
    mute._load().setTime(time);
    message.channel.send("Successfully muted the user")
    const { channel, enabled } = guild.getLog("mute");
    if (!enabled) return;
    guild.increaseCase();
    (message.guild!.channels.get(channel.id) as TextChannel).send(
      new VorteEmbed(message)
        .baseEmbed()
        .setTitle(`Moderation: Mute [Case ID: ${guild.case}]`)
      .setDescription(`**>** Muted: ${member.user.tag}\n**>** Muted By: ${message.author.tag}\n**>** Time: ${time}`)
    );
  }
};