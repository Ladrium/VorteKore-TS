"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../../lib");
const Command_1 = require("../../lib/classes/Command");
const ms = require("ms");
class default_1 extends Command_1.Command {
    constructor() {
        super("help", {
            category: "Information",
            cooldown: 5000
        });
    }
    async run(message, args) {
        const helpEmbed = new lib_1.VorteEmbed(message).baseEmbed();
        if (!args[0] || !this.bot.commands.some(v => v.name.ignoreCase(args[0]) || v.aliases.some(a => a.ignoreCase(args[0])))) {
            helpEmbed.setAuthor("All Commands", message.author.displayAvatarURL());
            for (const category of this.handler.cateories) {
                const commands = this.handler.getCategory(category);
                if (commands.size)
                    helpEmbed.addField(category, commands.map(c => `\`${c.name}\``).join(", "), true);
            }
        }
        else {
            let info = "", command = this.handler.getCommand(args[0]);
            info += `**Category**: ${command.category}\n`;
            info += `**Description**: ${command.description || "None"}\n`;
            info += `**Cooldown**: ${ms(command.cooldown)}\n`;
            info += `**Aliases**: ${command.aliases.length ? command.aliases.map(a => `\`${a}\``).join(", ") : "None"}\n`;
            info += `**Example**: ${command.example || "None"}`;
            helpEmbed.setAuthor(`${this.handler.prefix(message)}${command.name} ${command.usage}`, message.author.displayAvatarURL());
            helpEmbed.setDescription(info);
        }
        message.channel.send(helpEmbed);
    }
}
exports.default = default_1;
;
