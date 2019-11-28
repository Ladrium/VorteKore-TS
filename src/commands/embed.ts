import { Command } from "../structures/Command";
import { VorteClient } from "../structures/VorteClient";
import { Message } from "discord.js";
import VorteEmbed from "../structures/VorteEmbed";
import { checkPermissions } from "../util";

export class Cmd extends Command {
  constructor(bot: VorteClient) {
    super(bot, {
      name: "emb",
      category: "Utility",
      cooldown: 5000
    })
  }
  run(message: Message, args: string[]) {
    if (!checkPermissions(message.member!, "ADMINISTRATOR")) return message.channel.send("You dont have permissions.");
    const emb = args.join(" ").split(" | ");
    if (!message.deletable) return message.channel.send("Dont have permission to delete the message");
    message.delete();
    message.channel.send(new VorteEmbed(message).baseEmbed().setTitle(emb[0]).setDescription(emb[1]));
  }
};