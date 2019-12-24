import { Message, TextChannel } from "discord.js";
import { VorteGuild, VorteEmbed, Event } from "../../lib";

export default class extends Event {
  public constructor() {
    super("message-deleted", {
      category: "guild",
      event: "messageDelete"
    });
  }

  async run(oldmsg: Message, newmsg: Message, bot = this.bot) {
    const guild = await new VorteGuild(oldmsg.guild!);
    if (!oldmsg || !newmsg || oldmsg.content === newmsg.content) return;
    const { channel, enabled } = guild.getLog("editMessage");
    if (!enabled) return;
    guild.increaseCase();
    const oldcon = oldmsg.cleanContent.toString().slice(0, 900);
    const newcon = newmsg.cleanContent.toString().slice(0, 900);
    const ch = oldmsg.guild!.channels.get(channel) as TextChannel;
  
    if (!ch) return;
  
    ch.send(
      new VorteEmbed(newmsg)
        .baseEmbed()
        .setTitle(`Event: Message Update [Case ID: ${guild.case}]\n`)
        .addField(`Old Message:`, oldcon)
        .addField(`New Message`, newcon)
        .addField(`Channel`, `<#${ch.id}> [Jump To Message]`)
    )
  };
}