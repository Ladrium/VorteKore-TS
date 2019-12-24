import { Message, MessageEmbed } from "discord.js";

export class VorteEmbed {
  constructor(
    public message: Message
  ) {}  

  public baseEmbed(): MessageEmbed {
    return new MessageEmbed()
      .setAuthor(this.message.author.username, this.message.author.displayAvatarURL())
      .setFooter(`VorteKore | ChaosPhoe`)
      .setColor("#4b62fa");
  }

  public errorEmbed(error?: string): MessageEmbed {
    const embed = this.baseEmbed()
      .setTitle("Oops!")
      .setColor("#ff4255")
    if (error) 
      embed.setDescription(`Sorry, I ran into an error!\n\`\`\`js\n${error}\`\`\``);
    return embed;
  }
}