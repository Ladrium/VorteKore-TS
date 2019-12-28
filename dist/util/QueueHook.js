"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../lib");
const Hook_1 = require("../lib/classes/Hook");
const discord_js_1 = require("discord.js");
class QueueHook extends Hook_1.Hook {
    async last_man_standing({ player } = this.emitter) {
        await player.message.sem("Oh okay... I'm all alone *sobs*, I might as well leave :(");
        return player.node.leave(player.guildId);
    }
    async next({ song }, { player } = this.emitter) {
        return player.message.sem(`Now playing **[${discord_js_1.Util.escapeMarkdown(song.info.title)}](${song.info.uri})** because <@${song.requester}> requested it.`, { type: "music" });
    }
    async finish({ player } = this.emitter) {
        player.message.sem(`There are no more songs left in the queue 👋\n*Psssst* If you liked the quality give us some feedback with \`!feedback\``, { type: "music" });
        return player.node.leave(player.guildId);
    }
}
__decorate([
    lib_1.listen("last_man_standing"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], QueueHook.prototype, "last_man_standing", null);
__decorate([
    lib_1.listen("next"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, lib_1.VorteQueue]),
    __metadata("design:returntype", Promise)
], QueueHook.prototype, "next", null);
__decorate([
    lib_1.listen("finish"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [lib_1.VorteQueue]),
    __metadata("design:returntype", Promise)
], QueueHook.prototype, "finish", null);
exports.QueueHook = QueueHook;
