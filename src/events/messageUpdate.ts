import { VorteClient } from "../structures/VorteClient";
import { Message, TextChannel } from "discord.js";
import { VorteGuild } from "../structures/VorteGuild";
import VorteEmbed from "../structures/VorteEmbed";

export = (bot: VorteClient, oldmsg: Message, newmsg: Message, guild: VorteGuild) => {
  if (!oldmsg || !newmsg || oldmsg.content === newmsg.content) return;
  const { channel, enabled } = guild.getLog("editMessage");
  if (!enabled) return;
  guild.increaseCase();
  const oldcon = oldmsg.cleanContent.toString().slice(0, 900);
  const newcon = newmsg.cleanContent.toString().slice(0, 900);
  (oldmsg.guild!.channels.get(channel.id) as TextChannel).send(
    new VorteEmbed(newmsg)
      .baseEmbed()
      .setTitle(`Event: Message Delete [Case ID: ${guild.case}]\n`)
      .addField(`Old Message:`, oldcon)
      .addField(`New Message`, newcon)
  )
}