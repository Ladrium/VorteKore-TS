"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../../lib");
const Case_1 = require("../../models/Case");
const DBLAPI = require("dblapi.js");
class default_1 extends lib_1.Event {
    constructor() {
        super("bot-ready", {
            category: "client",
            event: "ready"
        });
    }
    async run(bot = this.bot) {
        await bot.plugins.forEach(plugin => plugin.onReady());
        await bot.logger.info(`${bot.user.username} is ready to rumble!`);
        bot.andesite.init(bot.user.id);
        bot.user.setPresence({
            activity: {
                name: "VorteKore | !help",
                type: "STREAMING",
                url: "https://api.chaosphoe.xyz/rick"
            },
        });
        if (process.env.NODE_ENV.ignoreCase("production")) {
            bot.dbl = new DBLAPI(process.env.DBL_TOKEN, this.bot);
        }
        setInterval(async () => {
            const cases = await this.bot.database.cases.find({ type: "mute" });
            cases.forEach(async (x) => {
                if (x.amount <= Date.now()) {
                    try {
                        const guild = bot.guilds.get(x.guildId);
                        if (!guild)
                            return Case_1.CaseEntity.delete({ id: x.id });
                        const _guild = await bot.database.getGuild(guild.id);
                        if (!_guild.muteRole)
                            return Case_1.CaseEntity.delete({ id: x.id });
                        const member = guild.members.get(x.subject) || await guild.members.fetch(x.subject) || null;
                        if (!member)
                            return Case_1.CaseEntity.delete({ id: x.id });
                        const muteRole = guild.roles.find((r) => r.id === _guild.muteRole);
                        member.roles.remove(muteRole).catch(null);
                        return Case_1.CaseEntity.delete({ id: x.id });
                    }
                    catch (error) {
                    }
                }
            });
            const players = bot.andesite.players;
            for (const [, player] of players) {
                const channel = bot.channels.get(player.channelId);
                if (!channel || !channel.members.filter(m => !m.user.bot).size)
                    return player.queue.emit("last_man_standing");
            }
        }, 10000);
    }
    ;
}
exports.default = default_1;
