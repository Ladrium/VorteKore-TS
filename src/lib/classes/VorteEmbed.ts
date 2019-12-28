import { Message, MessageEmbed } from "discord.js";
import { VorteMessage } from "./Message";

export class VorteEmbed {
  constructor(
    public message: VorteMessage
  ) { }

  public baseEmbed(): MessageEmbed {
    return new MessageEmbed()
      .setAuthor(this.message.author.username, this.message.author.displayAvatarURL())
      .setTimestamp()
      .setFooter(`VorteKore`)
      .setColor(this.message.guild ? this.message._guild.embedColor ? this.message._guild.embedColor : "#4b62fa" : "#4b62fa");
  }

  public errorEmbed(error?: string): MessageEmbed {
    const embed = this.baseEmbed()
      .setAuthor("Oops!", this.message.author.displayAvatarURL())
      .setColor("#ff4255")
    if (error)
      embed.setDescription(`Sorry, I ran into an error!\n\`\`\`js\n${error}\`\`\``);
    return embed;
  }

  public musicEmbed(): MessageEmbed {
    return this.baseEmbed();
  }
}