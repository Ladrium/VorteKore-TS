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
const discord_js_1 = require("discord.js");
const Mute_1 = require("../Mute");
const Player_1 = require("./Player");
class VorteClient extends discord_js_1.Client {
    constructor(options) {
        super(options);
        this.commands = new discord_js_1.Collection();
        this.aliases = new discord_js_1.Collection();
        this.player;
        this.on("ready", () => {
            console.log(`${this.user.username} is ready to rumble!`);
            this.player = new Player_1.Player(this);
            this.player._init();
            setInterval(() => __awaiter(this, void 0, void 0, function* () {
                const mutes = yield Mute_1.Mute.getAll();
                mutes.forEach((x) => __awaiter(this, void 0, void 0, function* () {
                    if (x.time <= Date.now()) {
                        const guild = this.guilds.get(x.guildID);
                        if (!guild)
                            return Mute_1.Mute.deleteOne(x.guildID, x.userID);
                        const member = guild.members.get(x.userID) || (yield guild.members.fetch(x.userID)) || null;
                        if (!member)
                            return Mute_1.Mute.deleteOne(x.guildID, x.userID);
                        const muteRole = guild.roles.find((x) => x.name.toLowerCase() === "muted");
                        member.roles.remove(muteRole).catch(null);
                        return Mute_1.Mute.deleteOne(x.guildID, x.userID);
                    }
                }));
            }), 5000);
        });
    }
}
exports.VorteClient = VorteClient;
