import { Guild, MessageEmbed, TextChannel } from "discord.js";
import { Event } from "../../lib";

export default class extends Event {
  public constructor() {
    super("guild-created", {
      category: "guild",
      event: "guildCreate"
    });
  }

  async run(guild: Guild) {
    const entry = await this.bot.database.getGuild(guild.id);
    const logs = <TextChannel> await this.bot.channels.fetch("613827877015650304");

    return logs.send(new MessageEmbed({ thumbnail: guild.iconURL() ? { url: guild.iconURL()! } : {} })
      .setColor("GREEN")
      .setTitle("New Guild!")
      .setDescription(`I have joined a new guild called "${guild.name}", they have ${guild.members.filter(g => !g.user.bot).size} members!\n\nWe now have ${this.bot.guilds.size.toLocaleString()}`))
  };
}