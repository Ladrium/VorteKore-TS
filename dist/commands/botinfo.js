"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const structures_1 = require("../structures");
const ms_1 = __importDefault(require("ms"));
class Cmd extends structures_1.Command {
    constructor(bot) {
        super(bot, {
            name: "botinfo",
            aliases: ["bi"],
            category: "Information",
            cooldown: 0
        });
    }
    run(message, [], guild) {
        const time = ms_1.default(this.bot.uptime, { long: true });
        const emb = new structures_1.VorteEmbed(message).baseEmbed()
            .setTitle(`${this.bot.user.username} Bot Info`)
            .setDescription(`Hello, I'm ${this.bot.user.username}!, I am a public bot. If you wish to check out the commands I have, please do \`${guild.prefix}help\`. If you want to invite this bot to your server, Please do: \`${guild.prefix}invite\`\n\n**Uptime:** ${time}\n**Total User Count:** ${message.guild.memberCount}\n**Total Commands Count:** ${this.bot.commands.size}\n\n[Invite bot to your server](http://bit.ly/VorteKore)`);
        message.channel.send(emb);
    }
}
exports.Cmd = Cmd;
