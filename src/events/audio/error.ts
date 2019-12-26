import { Event } from "../../lib";

export default class extends Event {
  public constructor() {
    super("andesite-error", {
      category: "client",
			event: "error",
			emitter: "andesite"
    });
  }

  async run(error: Error, bot = this.bot) {
    return bot.logger.warn(error);
  };
}