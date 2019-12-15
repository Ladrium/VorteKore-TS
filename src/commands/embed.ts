import { Command } from "../structures/Command";
import { VorteClient, VorteEmbed } from "../structures";
import { Message } from "discord.js";
import { checkPermissions } from "../util";

export class Cmd extends Command {
  constructor(bot: VorteClient) {
    super(bot, {
      name: "emb",
      aliases: ["embed"],
      category: "Utility",
      cooldown: 1000,
      description: "Creates an embed with provided title and description",
      usage: "!embed title | description",
      example: "!embed Cool guy | I know i am really cool"

    })
  }
  run(message: Message, args: string[]) {
    if (!checkPermissions(message.member!, "ADMINISTRATOR")) return message.channel.send("You dont have permissions.");
    const emb = args.join(" ").split(" | ");
    if (!message.deletable) return message.channel.send("Dont have permission to delete the message");
    message.delete();
    message.channel.send(new VorteEmbed(message).baseEmbed().setTitle(emb[0]).setDescription(emb[1]).setFooter(message.author.tag, message.author.displayAvatarURL()));
  }
};