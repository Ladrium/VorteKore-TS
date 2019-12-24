"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_andesite_1 = require("discord.js-andesite");
const VorteQueue_1 = require("./VorteQueue");
class VortePlayer extends discord_js_andesite_1.Player {
    constructor(node, options) {
        super(node, options);
        this.queue = new VorteQueue_1.VorteQueue(this);
        this.bass = "none";
        this.channel = node.manager.client.channels.get(options.channelId);
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
