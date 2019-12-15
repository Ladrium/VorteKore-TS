"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const structures_1 = require("../structures");
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
        return __awaiter(this, void 0, void 0, function* () {
            const emb = new structures_1.VorteEmbed(message).baseEmbed()
                .setTitle(`${this.bot.user.username} Bot Info`)
                .setDescription(`Hello, I'm ${this.bot.user.username}!, I am a public bot. If you wish to check out the commands I have, please do ${guild.prefix}help. If you want to invite this bot to your server, Please do: ${guild.prefix}invite\n\n**Uptime:** ${this.bot.uptime}\n**Total User Count:** ${message.guild.memberCount}\nTotal Commands Count: ${this.bot.commands.size}\n\n[Invite bot to your server](http://bit.ly/VorteKore)`);
            message.channel.send(emb);
        });
    }
}
exports.Cmd = Cmd;
