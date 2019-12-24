"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ms_1 = __importDefault(require("ms"));
const lib_1 = require("../../lib");
class default_1 extends lib_1.Command {
    constructor() {
        super("botinfo", {
            aliases: ["status"],
            category: "Information",
            cooldown: 0
        });
    }
    run(message, [], guild) {
        const time = ms_1.default(this.bot.uptime, { long: true });
        const emb = new lib_1.VorteEmbed(message).baseEmbed()
            .setTitle(`${this.bot.user.username} Bot Info`)
            .setDescription(`Hello, I'm ${this.bot.user.username}!, I am a public bot. If you wish to check out the commands I have, please do ${guild.prefix}help. If you want to invite this bot to your server, Please do: ${guild.prefix}invite`)
            .addField("\u200B", `**Guild Count**: ${this.bot.guilds.size}\n**Total Users**: ${this.bot.users.size}\n**Total Commands**: ${this.bot.commands.size}\n**Uptime:** ${time}\n\n[Invite bot to your server](http://bit.ly/VorteKore)`);
        message.channel.send(emb);
    }
}
exports.default = default_1;
