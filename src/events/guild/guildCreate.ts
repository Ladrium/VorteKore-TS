import { Guild } from "discord.js";
import { VorteGuild } from "../../lib";
import { Event } from "../../lib";

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