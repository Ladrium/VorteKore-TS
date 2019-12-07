"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_lavalink_1 = require("discord.js-lavalink");
const util_1 = require("../util");
const Queue_1 = require("./Queue");
class Player {
    constructor(node, bot) {
        this.node = node;
        this.bot = bot;
        this.lavalink;
        this.queue = Queue_1.Queue;
    }
    getSongs(query) {
        const output = util_1.get(`http://${this.node.host}:${this.node.port}/loadtracks?identifier=ytsearch%3A${encodeURIComponent(query)}`, { headers: { Authorization: this.node.password } });
        return output;
    }
    _init() {
        this.lavalink = new discord_js_lavalink_1.PlayerManager(this.bot, this.node, {
            user: this.bot.user.id,
            shards: 0
        });
    }
}
exports.Player = Player;
