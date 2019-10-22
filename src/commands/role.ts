import { Command } from "../structures/Command";
import { VorteClient } from "../structures/VorteClient";
import { Message, GuildMember } from "discord.js";
import VorteEmbed from "../structures/VorteEmbed"

export class Cmd extends Command {
  constructor(bot: VorteClient) {
    super(bot, {
      name: "role",
      category: "Moderation",
      cooldown: 0,
      usage: "!role <add|remove> @member role",
      example: "!role remove @Chaos_Phoe#0001 Contributor"
    })
  }
  async run(message: Message, args: string[]) {

    if (!args[0]) return message.channel.send(new VorteEmbed(message).errorEmbed("Provide if you want to add or remove the role!"));
    if (!args[1]) return message.channel.send(new VorteEmbed(message).errorEmbed("Provide a member to add/remove the role to!"));
    if (!args[2]) return message.channel.send(new VorteEmbed(message).errorEmbed("Provide a role to add/remove!"));

    const member = message.mentions.members!.first() || message.guild!.members.find(x => x.displayName === args[1]) || await message.guild!.members.fetch(args[1]);
    const role = message.mentions.roles.first() || message.guild!.roles.find(r => r.name === args[2]) || message.guild!.roles.get(args[2]);

    if (!member) return message.channel.send(new VorteEmbed(message).errorEmbed("Unable to find the member."));
    if (!role) return message.channel.send(new VorteEmbed(message).errorEmbed("Unable to find the role."))

    if (args[0]!.toLowerCase() === 'add') {
      member!.roles.add(role);
      message.channel.send(new VorteEmbed(message).baseEmbed().setDescription("Succesfully added the role."));
    } else if (args[0] === 'remove') {
      member!.roles.remove(role);
      message.channel.send(new VorteEmbed(message).baseEmbed().setDescription("Succesfully removed the role."))
    } else {
      message.reply("Please use !help role");
    }
  }
};