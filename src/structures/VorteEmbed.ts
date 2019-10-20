import { MessageEmbed, MessageEmbedOptions, Message } from "discord.js";

export default class {
  baseEmbed(message: Message) {
    return new MessageEmbed()
      .setAuthor(message.author.username, message.author.displayAvatarURL())
      .setFooter(message.client.user!.username, message.client.user!.displayAvatarURL())
      .setColor("#f54b02");
  }
  ErrorEmbed(message: Message, error: string) {
    return this.baseEmbed(message)
      .setTitle("ERROR")
      .addField("Sorry a problem occured", error)
      .setColor("#ff0000")
  }
}