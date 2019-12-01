import { VorteClient } from "../structures/VorteClient";
import { Message, TextChannel } from "discord.js";
import { VorteGuild } from "../structures/VorteGuild";
import VorteEmbed from "../structures/VorteEmbed";

export = (bot: VorteClient, deletedMessage: Message, guild: VorteGuild) => {
  const { channel, enabled } = guild.getLog("deleteMessage")
  if (!enabled) return;
  const chan = deletedMessage.guild!.channels.get(channel.id) as TextChannel;
  guild.increaseCase();
  chan.send(
    new VorteEmbed(deletedMessage)
      .baseEmbed()
      .setDescription(`Event: Message Deleted [Case ID: ${guild.case}]\nUser: ${deletedMessage.author.tag} (${deletedMessage.author.id})\nMessage: ${deletedMessage.content}`).setTimestamp()
  );
};