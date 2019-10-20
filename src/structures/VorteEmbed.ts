import { MessageEmbed, MessageEmbedOptions, Message } from "discord.js";

export default class {
  message: Message;
  constructor(message: Message) {
    this.message = message;
  }
  baseEmbed() {
    return new MessageEmbed()
      .setAuthor(this.message.author.username, this.message.author.displayAvatarURL())
      .setFooter(this.message.client.user!.username, this.message.client.user!.displayAvatarURL())
      .setColor("#f54b02");
  }
  ErrorEmbed(error: string) {
    return this.baseEmbed()
      .setTitle("ERROR")
      .addField("Sorry a problem occured", error)
      .setColor("#ff0000")
  }
}