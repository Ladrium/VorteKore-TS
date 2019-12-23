"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../../structures/Command");
const structures_1 = require("../../structures");
class default_1 extends Command_1.Command {
    constructor() {
        super("help", {
            category: "Information",
            cooldown: 5000
        });
    }
    run(message, args) {
        let command;
        if (args[0])
            command = this.bot.handler.getCommand(args[0]);
        const helpEmbed = new structures_1.VorteEmbed(message).baseEmbed()
            .setTitle("Help");
        if (!command) {
            const commands = this.bot.handler.getAllCommands().commands;
            const categories = [];
            commands.forEach((cmd) => {
                if (!categories.includes(cmd.category))
                    categories.push(cmd.category);
            });
            categories.forEach((cat) => {
                const cmds = commands.filter((cmd) => cmd.category === cat);
                helpEmbed.addField(cat, cmds.map((x) => `\`\`${x.name}\`\``).join(",\n"), true);
            });
        }
        else {
            let info = "";
            Object.keys(command).forEach((x) => {
                if (x === "bot")
                    return;
                if (x === "name")
                    return helpEmbed.setTitle(`Help: ${x}`);
                if (x === "aliases")
                    return command[x][0] ? info += `aliases: ${command[x].map((y) => `\`\`${y}\`\``).join(", ")}\n` : null;
                if (command[x])
                    info += `${x}: ${command[x]}\n`;
            });
            helpEmbed.setDescription(info);
        }
        message.channel.send(helpEmbed);
    }
}
exports.default = default_1;
;
