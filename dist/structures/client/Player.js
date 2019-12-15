"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_lavalink_1 = require("discord.js-lavalink");
const util_1 = require("../../util");
const Queue_1 = require("./Queue");
const config_1 = __importDefault(require("../../config"));
class Player {
    constructor(bot) {
        this.bot = bot;
        this.lavalink;
        this.queue = Queue_1.Queue;
    }
    getSongs(query) {
        const output = util_1.get(`http://${config_1.default[0].host}:${config_1.default[0].port}/loadtracks?identifier=ytsearch%3A${encodeURIComponent(query)}`, { headers: { Authorization: config_1.default[0].password } });
        return output;
    }
    _init() {
        this.lavalink = new discord_js_lavalink_1.PlayerManager(this.bot, config_1.default, {
            user: this.bot.user.id,
            shards: 0
        });
    }
}
exports.Player = Player;
