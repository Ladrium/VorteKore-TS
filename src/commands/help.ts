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
    const helpEmbed = new VorteEmbed(message).baseEmbed()
      .setTitle("Help")
    const commands = this.bot.handler!.getAllCommands().commands;
    const categories: string[] = [];
    commands.forEach((cmd: Command) => {
      if (!categories.includes(cmd.category)) categories.push(cmd.category);
    });
    categories.forEach((cat: string) => {
      const cmds = commands.filter((cmd: Command) => cmd.category === cat);
      helpEmbed.addField(cat, cmds.map((x) => `\`\`${x.name}\`\``).join(",\n"), true)
    });
    message.channel.send(helpEmbed);
  }
};