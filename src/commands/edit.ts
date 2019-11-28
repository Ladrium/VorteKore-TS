import { Command } from "../structures/Command";
import { VorteClient } from "../structures/VorteClient";
import { Message } from "discord.js";
import VorteEmbed from "../structures/VorteEmbed";
import { checkPermissions } from "../util";

export class Cmd extends Command {
  constructor(bot: VorteClient) {
    super(bot, {
      name: "edit",
      category: "Utility",
      cooldown: 0
    })
  }
  run(message: Message, args: string[]) {
    if (!checkPermissions(message.member!, "ADMINISTRATOR")) return message.channel.send("You dont have permissions.");
    if (!args[0]) return message.channel.send("Please provide message id to edit the message.");
    const d = args.slice(1).join(" ").split(" | ");
    message.channel.messages.fetch(args[0]).then(msg => {
      msg.edit(new VorteEmbed(message).baseEmbed().setTitle(d[0]).setDescription(d[1]).setFooter(`Editted On ${Date.now()}`));
    });

  }
};