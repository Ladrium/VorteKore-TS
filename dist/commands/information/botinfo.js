"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ms_1 = __importDefault(require("ms"));
const structures_1 = require("../../structures");
class default_1 extends structures_1.Command {
    constructor() {
        super("botinfo", {
            aliases: ["status"],
            category: "Information",
            cooldown: 0
        });
    }
    run(message, [], guild) {
        const time = ms_1.default(this.bot.uptime, { long: true });
        const emb = new structures_1.VorteEmbed(message).baseEmbed()
            .setTitle(`${this.bot.user.username} Bot Info`)
            .setDescription(`Hello, I'm ${this.bot.user.username}!, I am a public bot. If you wish to check out the commands I have, please do ${guild.prefix}help. If you want to invite this bot to your server, Please do: ${guild.prefix}invite\n\n**Uptime:** ${time}\n\n[Invite bot to your server](http://bit.ly/VorteKore)`)
            .addField("Guilds", this.bot.guilds.size)
            .addField("User Count", this.bot.users.size)
            .addField("Command Count", this.bot.commands.size);
        message.channel.send(emb);
    }
}
exports.default = default_1;
