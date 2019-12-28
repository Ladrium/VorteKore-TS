import { Message, TextChannel } from "discord.js";
import { Event, VorteEmbed, VorteMessage } from "../../lib";

export default class extends Event {
  public constructor() {
    super("message-deleted", {
      category: "guild",
      event: "messageDelete"
    });
  }

  async run(oldmsg: VorteMessage, newmsg: VorteMessage, bot = this.bot) {
    const guild = await this.bot.database.getGuild(oldmsg.guild!.id)
    if (!guild.logs.channel && !guild.logs.edtmsg) return;

    const oldcon = oldmsg.cleanContent.toString().slice(0, 900);
    const newcon = newmsg.cleanContent.toString().slice(0, 900);
    const ch = oldmsg.guild!.channels.get(guild.logs.channel) as TextChannel;

    if (!ch) return;

    ch.send(
      new VorteEmbed(newmsg)
        .baseEmbed()
        .setTitle(`Event: Message Update`)
        .setDescription([
          `**Channel**: ${newmsg.channel} (${newmsg.channel.id})`,
          `**Link**: ${newmsg.url}`,
          `**Author**: ${newmsg.author.tag} (${newmsg.author.id})`
        ].join("\n"))
        .addField(`Old Message:`, oldcon)
        .addField(`New Message`, newcon)
        .setTimestamp()
    )
  };
}