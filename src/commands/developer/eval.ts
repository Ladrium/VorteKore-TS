import { Command, VorteEmbed, VorteMessage } from "../../lib";
import { isPromise } from "../../util";

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

  public async run(message: VorteMessage, args: string[]) {
    let embed;
    try {
      const codein = args.join(" ");
      let code = eval(codein);
      if (isPromise(code)) code = await code;
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
      message.channel.send(embed);
    }
    catch (e) {
      embed = new VorteEmbed(message)
        .baseEmbed()
        .setTitle("Error")
        .setColor("#ff0000")
        .addField("Input", `\`\`\`js\n${args.join(" ")}\`\`\``)
        .addField("Error", `\`\`\`js\n${e.name}: ${e.message}\`\`\``);
      message.channel.send(embed);
    }
  }
};