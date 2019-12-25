import { Message } from "discord.js";
import { Command, VorteEmbed } from "../../lib";

export default class extends Command {
  public constructor() {
    super("eval", {
      category: "Developer",
      cooldown: 0,
      description: "Nothing lol",
      example: "!eval <code>",
      usage: "!ban <code>",
      devOnly: true
    });
  }

  public async run(message: Message, args: string[]) {
    let embed;
    try {
      const codein = args.join(" ");
      let code = await eval(codein);
      const ctype = typeof code;
      if (typeof code !== "string") {
        code = require("util").inspect(code, {
          depth: 0,
        });
      }
      embed = new VorteEmbed(message)
        .baseEmbed()
        .setTitle("Evaluation")
        .addField("Input", `\`\`\`js\n${codein}\`\`\``)
        .addField("Output", `\`\`\`js\n${code}\`\`\``)
        .addField("Type", `\`\`\`js\n${ctype}\`\`\``);
    }
    catch (e) {
      embed = new VorteEmbed(message)
        .baseEmbed()
        .setTitle("Error")
        .setColor("#ff0000")
        .addField("Input", `\`\`\`js\n${args.join(" ")}\`\`\``)
        .addField("Error", `\`\`\`js\n${e.name}: ${e.message}\`\`\``);
    }
    message.channel.send(embed);
  }
};