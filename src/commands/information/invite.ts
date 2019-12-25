import { Command, VorteMessage } from "../../lib";

export default class extends Command {
  constructor() {
    super("invite", {
      category: "Information",
      cooldown: 0
    });
  }
  
  async run(message: VorteMessage) {
    message.sem("Use this link to invite the bot: <http://bit.ly/2EmfskO>")
  }
}