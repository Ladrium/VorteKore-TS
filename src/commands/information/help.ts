import { VorteEmbed, VorteGuild, VorteMessage } from "../../lib";
import { Command } from "../../lib/classes/Command";
import ms = require("ms");

export default class extends Command {
  public constructor() {
    super("help", {
      category: "Information",
      cooldown: 5000
    });
  }

  public async run(message: VorteMessage, args: string[], guild: VorteGuild = message.getGuild()!) {
    const helpEmbed = new VorteEmbed(message).baseEmbed()

    if (!args[0] || !this.bot.commands.some(v => v.name.ignoreCase(args[0]) || v.aliases.some(a => a.ignoreCase(args[0])))) {
      helpEmbed.setAuthor("All Commands", message.author.displayAvatarURL());
      for (const category of this.handler.cateories) {
        const commands = this.handler.getCategory(category);
        if (commands.size)
          helpEmbed.addField(category, commands.map(c => `\`${c.name}\``).join(", "), true)
      }
    } else { 
      let info = "", command = this.handler.getCommand(args[0])!;
      info += `**Category**: ${command.category}\n`;
      info += `**Description**: ${command.description || "None"}\n`;
      info += `**Cooldown**: ${ms(command.cooldown)}\n`;
      info += `**Aliases**: ${command.aliases.length ? command.aliases.map(a => `\`${a}\``).join(", ") : "None"}\n`
      info += `**Example**: ${command.example || "None"}`;

      helpEmbed.setAuthor(`${guild ? guild.prefix : "!"}${command.name} ${command.usage}`, message.author.displayAvatarURL())
      helpEmbed.setDescription(info)
    }
    message.channel.send(helpEmbed);
  }
};