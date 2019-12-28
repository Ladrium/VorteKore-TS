"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../../lib");
const Profile_1 = require("../../models/Profile");
const util_1 = require("../../util");
class default_1 extends lib_1.Command {
    constructor() {
        super("leaderboard", {
            aliases: ["lb"],
            category: "Economy",
            cooldown: 500
        });
    }
    async run(message, [selected]) {
        let members = (await Profile_1.ProfileEntity.find({ guildId: message.guild.id }));
        if (!members.length)
            return message.sem("Nothing to show ¯\\_(ツ)_/¯");
        members = members.sort((a, b) => b.xp - a.xp);
        let { items, page } = util_1.paginate(members, selected), str = "", index = (page - 1) * 10;
        for (const member of items) {
            const user = this.bot.users.get(member.id);
            str += `${++index}. ${user.username} : ${member.level} [${member.xp}]\n`;
        }
        str += `Page : ${page}`;
        const leaderboardEmbed = new lib_1.VorteEmbed(message)
            .baseEmbed()
            .setAuthor("Leaderboard", message.author.displayAvatarURL())
            .setDescription("\`\`\`\n" + str + "\`\`\`");
        return message.channel.send(leaderboardEmbed);
    }
}
exports.default = default_1;
