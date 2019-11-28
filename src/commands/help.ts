import { Command } from "../structures/Command";
import { VorteClient } from "../structures/VorteClient";
import { Message } from "discord.js";
import VorteEmbed from "../structures/VorteEmbed";

export class Cmd extends Command {
  constructor(bot: VorteClient) {
    super(bot, {
      name: "help",
      category: "Information",
      cooldown: 5000
    })
  }
  run(message: Message, args: string[]) {
    let command: Command | undefined;
    if (args[0]) command = this.bot.handler!.getCommand(args[0]);
    const helpEmbed = new VorteEmbed(message).baseEmbed()
      .setTitle("Help")
    if (!command) {
      const commands = this.bot.handler!.getAllCommands().commands;
      const categories: string[] = [];
      commands.forEach((cmd: Command) => {
        if (!categories.includes(cmd.category)) categories.push(cmd.category);
      });
      categories.forEach((cat: string) => {
        const cmds = commands.filter((cmd: Command) => cmd.category === cat);
        helpEmbed.addField(cat, cmds.map((x) => `\`\`${x.name}\`\``).join(",\n"), true)
      });
    } else {
      let info = "";
      Object.keys(command).forEach((x: any) => {
        if (x === "bot") return;
        if (x === "name") return helpEmbed.setTitle(`Help: ${x}`)
        if (x === "aliases") return command![x as "aliases"][0] ? info += `aliases: ${command![x as "aliases"].map((y) => `\`\`${y}\`\``).join(", ")}\n` : null;
        if (command![x as "category" | "cooldown" | "description" | "usage"]) info += `${x}: ${command![x as "category" | "cooldown" | "description" | "usage"]}\n`;
      });
      helpEmbed.setDescription(info)
    }
    message.channel.send(helpEmbed);
  }
};