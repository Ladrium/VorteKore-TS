import { Event } from "../../lib";

export default class extends Event {
  public constructor() {
    super("bot-warn", {
      category: "client",
      event: "warn"
    });
  }

  async run(error: Error, bot = this.bot) {
    return bot.logger.warn(error);
  };
}