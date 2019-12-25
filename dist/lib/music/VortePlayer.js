"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_andesite_1 = require("discord.js-andesite");
const VorteQueue_1 = require("./VorteQueue");
class VortePlayer extends discord_js_andesite_1.Player {
    constructor() {
        super(...arguments);
        this.queue = new VorteQueue_1.VorteQueue(this);
        this.bass = "none";
    }
    useMessage(message) {
        this.message = message;
        return this;
    }
    in(member) {
        const channel = member.guild.channels.get(this.channelId);
        return channel.members.has(member.user.id);
    }
}
exports.VortePlayer = VortePlayer;
