import { Guild } from "discord.js";
import { VorteGuild } from "../../structures";
import { Event } from "../../structures/Event";

export default class extends Event {
  public constructor() {
    super("guild-deleted", {
      category: "guild",
      event: "guildDelete"
    });
  }

  async run(guild: Guild) {
    await VorteGuild.delete(guild);
  };
}