import { Command } from "../structures/Command";
import { VorteClient } from "../structures/VorteClient";
import { Message, GuildMemberRoleStore, RoleStore, Role } from "discord.js";
import { VorteGuild } from "../structures/VorteGuild";
import VorteEmbed from "../structures/VorteEmbed";
import ms from "ms";
export class Cmd extends Command {
  constructor(bot: VorteClient) {
    super(bot, {
      name: "mute",
      category: "Moderation",
      cooldown: 0
    })
  }
  run(message: Message, args: string[], guild: VorteGuild) {
    message.delete()
    if (!args[0]) return message.channel.send(new VorteEmbed(message).baseEmbed().setDescription("Please provide a user to mute"));
    const member = message.mentions.members!.first() || message.guild!.members.find(r => r.displayName === args[0] || r.id === args[0]);
    if (!member) return message.channel.send(new VorteEmbed(message).baseEmbed().setDescription("Invalid member provided"))
    if (!args[1]) return message.channel.send(new VorteEmbed(message).baseEmbed().setDescription("Please provide a time."));
    const time = ms(args[1]);
    if (!time) return message.channel.send(new VorteEmbed(message).baseEmbed().setDescription("Please provide a valid time"));
    const memr = [] as string[];
    member.roles.forEach(e => {
      if (e.id === message.guild!.id) return;
      memr.push(e.id)
    });
    // const r = new Array<at>();
    // type at = { id: string, roles: string[] };
    // r.push({ id: member.user.id, roles: memr });
    member.roles.remove(memr);
    message.channel.send("Successfully muted the user")
    setTimeout(() => {
      member.roles.add(memr)
    }, time);
  }
};