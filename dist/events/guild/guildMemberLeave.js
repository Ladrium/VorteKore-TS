"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../../lib");
const util_1 = require("../../util");
class default_1 extends lib_1.Event {
    constructor() {
        super("member-leave", {
            category: "guild",
            event: "guildMemberRemove"
        });
    }
    async run(member) {
        const guild = await this.bot.database.getGuild(member.guild.id);
        const channel = guild.logs.memberJoined;
        if (!channel)
            return;
        const welcomeChannel = member.guild.channels.get(channel);
        if (!welcomeChannel)
            return;
        welcomeChannel.send(util_1.formatString(guild.farewellMessage, member));
    }
    ;
}
exports.default = default_1;
