import { Message } from "discord.js";
import { Command } from "../../lib";

export default class extends Command {
  constructor() {
    super("invite", {
      category: "Information",
      cooldown: 0
    });
  }
  
  async run(message: Message) {
    message.reply("Use this link to invite the bot: <http://bit.ly/2EmfskO>")
  }
}