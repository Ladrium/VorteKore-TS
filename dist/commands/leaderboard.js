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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const structures_1 = require("../structures");
const member_1 = __importDefault(require("../models/member"));
class Cmd extends structures_1.Command {
    constructor(bot) {
        super(bot, {
            name: "leaderboard",
            aliases: ["lb"],
            category: "Economy",
            cooldown: 500
        });
    }
    run(message, [page], guild) {
        return __awaiter(this, void 0, void 0, function* () {
            let members = yield member_1.default.find({ guildID: message.guild.id });
            members = members.sort((a, b) => b.xp - a.xp);
            let str = "";
            if (!page || isNaN(page) || page.includes("-"))
                page = 1;
            if (page == 1 || page > members.length / 10) {
                members.slice(0, 10).forEach((member, i) => {
                    let username = message.guild.members.get(member.id);
                    username = username.user.username || "Unknown";
                    str += `${i + 1}. **${username}** - Level **${member.level}**, XP: **${member.xp}**\n`;
                });
                str += "Page: 1";
            }
            else {
                page = Math.round(page);
                for (let i = page * 10 - 10; i < page * 10; i++) {
                    let username = message.guild.members.get(members[i].id);
                    username = username.user.username || "Unknown";
                    str += `${i + 1}. **${username}** - Level **${members[i].level}**, XP: **${members[i].xp}**\n`;
                }
                str += `Page: ${page}`;
            }
            ;
            const leaderboardEmbed = new structures_1.VorteEmbed(message)
                .baseEmbed()
                .setTitle("Leaderboard")
                .setDescription(str);
            message.channel.send(leaderboardEmbed);
        });
    }
}
exports.Cmd = Cmd;
