import { VorteGuild, VorteEmbed, VorteClient } from "../structures";
import { Message, TextChannel } from "discord.js";

export = async(bot: VorteClient, deletedMessage: Message) => {
  const guild = new VorteGuild(deletedMessage.guild!)
  const { channel, enabled } = guild.getLog("deleteMessage")
  if (!enabled) return;
  const chan = deletedMessage.guild!.channels.get(channel) as TextChannel;
  guild.increaseCase();
  chan.send(
    new VorteEmbed(deletedMessage)
      .baseEmbed()
      .setDescription(`Event: Message Deleted [Case ID: ${guild.case}]\nUser: ${deletedMessage.author.tag} (${deletedMessage.author.id})\nMessage: ${deletedMessage.content}`).setTimestamp()
  );
};