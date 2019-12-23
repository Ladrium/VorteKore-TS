import { Command } from "../../structures/Command";
import { VorteClient, VorteEmbed } from "../../structures";
import { Message } from "discord.js";
import { checkPermissions } from "../../util";

export default class extends Command {
  public constructor() {
    super("edit", {
      category: "Utility",
      cooldown: 0,
      description: "Edits an embed",
      usage: "!edit MessageID Title | Description",
      example: "!edit 648491057318723584 This is the title | This is the Description"
    });
  }

  public run(message: Message, args: string[]) {
    if (!checkPermissions(message.member!, "ADMINISTRATOR")) return message.channel.send("You dont have permissions.");
    if (!args[0]) return message.channel.send("Please provide message id to edit the message.");
    const d = args.slice(1).join(" ").split(" | ");
    message.channel.messages.fetch(args[0]).then(msg => {
      msg.edit(new VorteEmbed(message).baseEmbed().setTitle(d[0]).setDescription(d[1]).setFooter(`Editted On ${Date.now()}`));
    });
  }
};