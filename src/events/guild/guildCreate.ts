import { Guild } from "discord.js";
import { VorteGuild } from "../../structures";
import { Event } from "../../structures/Event";

export default class extends Event {
  public constructor() {
    super("guild-created", {
      category: "guild",
      event: "guildCreate"
    });
  }

  async run(guild: Guild) {
    await new VorteGuild(guild);
  };
}