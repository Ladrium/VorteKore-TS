import { VorteClient } from "../structures/VorteClient";
import { Message, TextChannel } from "discord.js";
import { VorteGuild } from "../structures/VorteGuild";
import VorteEmbed from "../structures/VorteEmbed";

export = (bot: VorteClient, deletedMessage: Message, guild: VorteGuild) => {
  console.log(deletedMessage.content)
  const { channel, enabled } = guild.getLog("deleteMessage")
  if (!enabled) return;
  const chan = deletedMessage.guild!.channels.get(channel.id) as TextChannel;
  chan.send(
    new VorteEmbed(deletedMessage)
      .baseEmbed()
      .setDescription(`Event: Message Deleted\nUser: ${deletedMessage.author.tag}\nMessage: ${deletedMessage.content}`).setTimestamp()
  );
};