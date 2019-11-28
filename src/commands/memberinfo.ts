import { Command } from "../structures/Command";
import { VorteClient } from "../structures/VorteClient";
import { Message } from "discord.js";
import VorteEmbed from "../structures/VorteEmbed";

export class Cmd extends Command {
  constructor(bot: VorteClient) {
    super(bot, {
      name: "memberinfo",
      category: "Utility",
      cooldown: 5000,
      aliases: ["mi", "ui", "meminfo"]
    })
  }
  run(message: Message, [mem]: any) {
    let per = message.member; 
    if (mem) {
     per = message.guild!.members.find(a => a.displayName === mem || a.id === mem) || null;

    };
    if (!per) return message.channel.send(`Unable to `)
    new VorteEmbed(message).baseEmbed().setDescription(
    `**>** Name: ${per!.user.tag}
     **>** Joined At: ${per!.joinedAt}
     **>** Presence: ${per!.presence.status}
     **>** Roles: ${per!.roles.array().toString().replace('@everyone', '')}` 
    )
  }
};