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
const structures_1 = require("../structures");
const recently = new Set();
const coins = (max, min) => Math.floor(Math.random() * max) + min;
const xp = (max, min) => Math.floor(Math.random() * max) + min;
module.exports = (bot, message) => __awaiter(void 0, void 0, void 0, function* () {
    if (message.author.bot || !message.guild)
        return;
    const member = yield new structures_1.VorteMember(message.author.id, message.guild.id)._init();
    if (!recently.has(message.author.id)) {
        if (Math.random() > 0.50) {
            member.add("coins", coins(50, 5));
            if (Math.random() > 0.60) {
                member.add("xp", xp(25, 2));
                if (member.xp > 2 * (75 * member.level)) {
                    member.add("level", 1);
                    if (message.guild.id !== "264445053596991498")
                        message.channel.send(new structures_1.VorteEmbed(message).baseEmbed().setFooter(`Level Up! New Level: **${member.level}**`));
                }
            }
            member.save();
            recently.add(message.author.id);
            setTimeout(() => recently.delete(message.author.id), 25000);
        }
    }
    bot.handler.runCommand(message, member);
});
