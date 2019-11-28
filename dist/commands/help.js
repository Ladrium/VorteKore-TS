"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../structures/Command");
const VorteEmbed_1 = __importDefault(require("../structures/VorteEmbed"));
class Cmd extends Command_1.Command {
    constructor(bot) {
        super(bot, {
            name: "help",
            category: "Information",
            cooldown: 5000
        });
    }
    run(message, args) {
        const helpEmbed = new VorteEmbed_1.default(message).baseEmbed()
            .setTitle("Help");
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
        message.channel.send(helpEmbed);
    }
}
exports.Cmd = Cmd;
;
