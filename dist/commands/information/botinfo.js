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
const ms_1 = __importDefault(require("ms"));
const lib_1 = require("../../lib");
const util_1 = require("../../util");
class default_1 extends lib_1.Command {
    constructor() {
        super("botinfo", {
            aliases: ["status"],
            category: "Information",
            cooldown: 0
        });
    }
    run(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const emb = new lib_1.VorteEmbed(message).baseEmbed()
                .setAuthor(`${this.bot.user.username} Bot Info`, this.bot.user.displayAvatarURL())
                .setDescription(`Hello, I'm ${this.bot.user.username}!, I am a public bot. If you wish to check out the commands I have, please do \`!help\`.`)
                .addField("\u200B", this.buildStats());
            const commits = yield this.getCommits();
            if (commits)
                emb.addField("Github Commits", commits);
            return message.channel.send(emb);
        });
    }
    buildStats() {
        let time = ms_1.default(this.bot.uptime, { long: true }), fieldValue = "";
        fieldValue += `**Guild Count**: ${this.bot.guilds.size}\n`;
        fieldValue += `**Total Users**: ${this.bot.users.size}\n`;
        fieldValue += `**Total Commands**: ${this.bot.commands.size}\n`;
        fieldValue += `**Uptime:** ${time}\n`;
        fieldValue += `\n[Invite](http://bit.ly/VorteKore) • [Repository](https://github.com/ChaosPhoe/VorteKore-TS) • [Vote](https://top.gg/bot/634766962378932224)`;
        return fieldValue;
    }
    getCommits() {
        return __awaiter(this, void 0, void 0, function* () {
            let commits = yield util_1.get("https://api.github.com/repos/ChaosPhoe/VorteKore-TS/commits"), str = "";
            if (!commits.data) {
                console.error(commits.error);
                return false;
            }
            for (const { sha, html_url, commit, author } of commits.data.filter(c => c.committer.type.ignoreCase("user")).slice(0, 5))
                str += `[\`${sha.slice(0, 7)}\`](${html_url}) ${commit.message} - ${author.login}\n`;
            return str;
        });
    }
}
exports.default = default_1;
