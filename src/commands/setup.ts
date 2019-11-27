import { Command } from "../structures/Command";
import { VorteClient } from "../structures/VorteClient";
import { Message } from "discord.js";
import { VorteGuild } from "../structures/VorteGuild";
import { checkPermissions } from "../util";
import VorteEmbed from "../structures/VorteEmbed";

export class Cmd extends Command {
  constructor(bot: VorteClient) {
    super(bot, {
      name: "setup",
      category: "Moderation",
      cooldown: 200
    })
  }
  
  run(message: Message, args: string[], guild: VorteGuild) {
    if (args[0] === "prefix") {
      if (!checkPermissions(message.member!, "ADMINISTRATOR")) return message.channel.send(`Missing Permissions for using this command.`); 
      if (!args[1]) {
        message.channel.send(new VorteEmbed(message).baseEmbed().setTitle(`Current prefix is: \`${guild.prefix}\``))
      } else {
        guild.setPrefix(args[1]);
        message.channel.send(`Successfully changed the prefix to ${args[1]}`);
      };
    }
  }
}