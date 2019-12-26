"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
const lib_1 = require("../lib");
const Hook_1 = require("../lib/classes/Hook");
class QueueHook extends Hook_1.Hook {
    last_man_standing({ player } = this.emitter) {
        return __awaiter(this, void 0, void 0, function* () {
            yield player.message.sem("Oh okay... I'm all alone *sobs*, I might as well leave :(");
            return player.node.leave(player.guildId);
        });
    }
    next({ song }, { player } = this.emitter) {
        return __awaiter(this, void 0, void 0, function* () {
            return player.message.sem(`Now playing **[${song.info.title}](${song.info.uri})** because <@${song.requester}> requested it.`, { type: "music" });
        });
    }
    finish({ player } = this.emitter) {
        return __awaiter(this, void 0, void 0, function* () {
            player.message.sem(`There are no more songs left in the queue 👋\n*Psssst* If you liked the quality give us some feedback with \`!feedback\``, { type: "music" });
            return player.node.leave(player.guildId);
        });
    }
}
__decorate([
    lib_1.listen("last_man_standing")
], QueueHook.prototype, "last_man_standing", null);
__decorate([
    lib_1.listen("next")
], QueueHook.prototype, "next", null);
__decorate([
    lib_1.listen("finish")
], QueueHook.prototype, "finish", null);
exports.QueueHook = QueueHook;
