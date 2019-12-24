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
const discord_js_1 = require("discord.js");
const Mute_1 = require("./database/Mute");
const discord_js_andesite_1 = require("discord.js-andesite");
const config_1 = require("../config");
const _1 = require(".");
const dblapi_js_1 = __importDefault(require("dblapi.js"));
class VorteClient extends discord_js_1.Client {
    constructor(options) {
        super(options);
        this.commands = new discord_js_1.Collection();
        this.aliases = new discord_js_1.Collection();
        this.andesite = new discord_js_andesite_1.Manager(this, {
            nodes: config_1.nodes,
            player: _1.VortePlayer,
            restTimeout: 20000
        });
        this.queues = new discord_js_1.Collection();
        this.dbl = new dblapi_js_1.default(process.env.DBLTOKEN, this);
        this.on("ready", () => {
            console.log(`${this.user.username} is ready to rumble!`);
            this.andesite.init(this.user.id);
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
