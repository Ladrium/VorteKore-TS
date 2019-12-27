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
const lib_1 = require("../../lib");
const DBLAPI = require("dblapi.js");
class default_1 extends lib_1.Event {
    constructor() {
        super("bot-ready", {
            category: "client",
            event: "ready"
        });
    }
    run(bot = this.bot) {
        return __awaiter(this, void 0, void 0, function* () {
            yield bot.logger.info(`${bot.user.username} is ready to rumble!`);
            bot.andesite.init(bot.user.id);
            bot.user.setPresence({
                activity: {
                    name: "VorteKore | !help",
                    type: "STREAMING",
                    url: "https://api.chaosphoe.xyz/rick"
                },
            });
            if (process.env.NODE_ENV.ignoreCase("production")) {
                bot.dbl = new DBLAPI(process.env.DBL_TOKEN, {
                    statsInterval: 900000,
                    webhookAuth: process.env.DBL_WEBHOOK_AUTH,
                    webhookPath: process.env.DBL_WEBHOOK_PATH,
                    webhookPort: 3001
                });
            }
            setInterval(() => __awaiter(this, void 0, void 0, function* () {
                const mutes = yield lib_1.Mute.getAll();
                mutes.forEach((x) => __awaiter(this, void 0, void 0, function* () {
                    if (x.time <= Date.now()) {
                        try {
                            const guild = bot.guilds.get(x.guildID);
                            if (!guild)
                                return lib_1.Mute.deleteOne(x.guildID, x.userID);
                            const member = guild.members.get(x.userID) || (yield guild.members.fetch(x.userID)) || null;
                            if (!member)
                                return lib_1.Mute.deleteOne(x.guildID, x.userID);
                            const muteRole = guild.roles.find((x) => x.name.toLowerCase() === "muted");
                            member.roles.remove(muteRole).catch(null);
                            return lib_1.Mute.deleteOne(x.guildID, x.userID);
                        }
                        catch (error) {
                        }
                    }
                }));
                const players = bot.andesite.players;
                for (const [, player] of players) {
                    const channel = bot.channels.get(player.channelId);
                    if (!channel.members.filter(m => !m.user.bot).size)
                        return player.queue.emit("last_man_standing");
                }
            }), 10000);
        });
    }
    ;
}
exports.default = default_1;
