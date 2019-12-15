import { Command, VorteClient, VorteEmbed, VorteGuild } from "../structures";
import { Message } from "discord.js";

export class Cmd extends Command {
  constructor(bot: VorteClient) {
    super(bot, {
      name: "invite",
      category: "Information",
      cooldown: 0
    });
  }
  async run(message: Message) {
    message.reply("Use this link to invite the bot: <http://bit.ly/2EmfskO>")
  }
}