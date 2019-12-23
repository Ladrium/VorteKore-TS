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
const member_1 = __importDefault(require("../../models/member"));
const structures_1 = require("../../structures");
const util_1 = require("../../util");
class default_1 extends structures_1.Command {
    constructor() {
        super("leaderboard", {
            aliases: ["lb"],
            category: "Economy",
            cooldown: 500
        });
    }
    run(message, [page = 1]) {
        return __awaiter(this, void 0, void 0, function* () {
            let members = (yield member_1.default.find({ guildID: message.guild.id }));
            members = members.sort((a, b) => b.xp - a.xp);
            if (page > members.length)
                page = 1;
            let { items } = util_1.paginate(members, page, 10), str = "";
            for (const member of items) {
                const user = this.bot.users.get(member.id), xpPadding = items.reduce((base, _) => Math.max(base, String(_.xp).length), 0), levelPadding = items.reduce((base, _) => Math.max(base, String(_.level).length), 0);
                str += `[XP ${String(member.xp).padStart(xpPadding)} LVL ${String(member.level).padStart(levelPadding)}] : "${user.username}"\n`;
            }
            str += `Page : ${page}`;
            const leaderboardEmbed = new structures_1.VorteEmbed(message)
                .baseEmbed()
                .setAuthor("Leaderboard", message.author.displayAvatarURL())
                .setDescription("\`\`\`prolog\n" + str + "\`\`\`");
            return message.channel.send(leaderboardEmbed);
        });
    }
}
exports.default = default_1;
