import { Command } from "../structures/Command";
import { VorteClient, VorteEmbed } from "../structures";
import { Message } from "discord.js";
import { findMember } from "../util";

export class Cmd extends Command {
  constructor(bot: VorteClient) {
    super(bot, {
      name: "memberinfo",
      category: "Utility",
      cooldown: 5000,
      aliases: ["mi", "ui", "meminfo"],
      description: "!ui @user"
    })
  }
  async run(message: Message, [mem]: any) {
    const member = await findMember(message, mem);
    if (!member) return message.channel.send(`Unable to `)
    new VorteEmbed(message).baseEmbed().setDescription(
    `**>** Name: ${member!.user.tag}
     **>** Joined At: ${member!.joinedAt}
     **>** Presence: ${member!.presence.status}
     **>** Roles: ${member!.roles.array().toString().replace('@everyone', '')}` 
    )
  }
};