import { VorteClient } from "../structures/VorteClient";
import { Message, TextChannel } from "discord.js";
import { VorteGuild } from "../structures/VorteGuild";
import VorteEmbed from "../structures/VorteEmbed";

export = async(bot: VorteClient, oldmsg: Message, newmsg: Message) => {
  const guild = await new VorteGuild()._load(oldmsg.guild!);
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
      .setTitle(`Event: Message Delete [Case ID: ${guild.case}]\n`)
      .addField(`Old Message:`, oldcon)
      .addField(`New Message`, newcon)
  )
}