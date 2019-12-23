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
const discord_js_andesite_1 = require("discord.js-andesite");
const Queue_1 = require("./Queue");
const _1 = require(".");
const ms = require("ms");
class VortePlayer extends discord_js_andesite_1.Player {
    constructor(node, options) {
        super(node, options);
        this.queue = new Queue_1.Queue(this);
        this.node.manager.client.queues
            .set(options.guildId);
    }
    ended(data, message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (data.reason === "REPLACED")
                return;
            this.queue.next = this.queue.next.slice(1);
            const nextSong = this.queue.nextSong();
            if (!nextSong)
                return this.node.leave(this.guildId);
            yield this.play(nextSong.track);
            message.channel.send(new _1.VorteEmbed(message).baseEmbed()
                .setAuthor(`Up Next!`, message.author.displayAvatarURL())
                .setDescription(`**[${nextSong.info.title}](${nextSong.info.uri})**\n*${ms(nextSong.info.length)} long*`));
        });
    }
}
exports.VortePlayer = VortePlayer;
