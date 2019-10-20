import { Command } from "../structures/Command";
import { VorteClient } from "../structures/VorteClient";
import { Message, GuildMember } from "discord.js";

export class Cmd extends Command {
  constructor(bot: VorteClient) {
    super(bot, {
      name: "role",
      category: "Moderation",
      cooldown: 0
    })
  }
  async run(message: Message, args: string[]) {

    if (!args[0]) return message.channel.send("Please provide an argument: `add`, `remove`");
    if (!args[1]) return message.channel.send(`Please provide a member name/id`);
    const member = message.mentions.members!.first() || message.guild!.members.find(x => x.displayName === args[1]) || await message.guild!.members.fetch(args[1]);
    if (!member) return message.channel.send("Unable to find the member");
    if (!args[2]) return message.channel.send("Please provide a specific role");
    const role = message.mentions.roles.first() || message.guild!.roles.find(r => r.name === args[2]) || message.guild!.roles.get(args[2]);
    if (!role) return message.channel.send("Unable to find the role")



    if (args[0]!.toLowerCase() === 'add') {
      member!.roles.add(role);
      message.channel.send(`Added the role!`)
    } else if (args[0] === 'remove') {
      member!.roles.remove(role);
      message.channel.send("Succesfully removed the role")
    }
  }
};