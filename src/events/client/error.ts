import { Event } from "../../lib";

export default class extends Event {
  public constructor() {
    super("bot-error", {
      category: "client",
      event: "error"
    });
  }

  async run(error: Error, bot = this.bot) {
    return bot.logger.error(error);
  };
}