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
const Hook_1 = require("../lib/music/Hook");
const Decorator_1 = require("../lib/music/Decorator");
class QueueHook extends Hook_1.Hook {
    next({ song }, { player } = this.emitter) {
        return __awaiter(this, void 0, void 0, function* () {
            return player.message.sem(`Now playing **[${song.info.title}](${song.info.uri})**.`);
        });
    }
    finish({ player } = this.emitter) {
        return __awaiter(this, void 0, void 0, function* () {
            player.message.sem(`There are no more songs left in the queue 👋!`);
            return player.node.leave(player.guildId);
        });
    }
}
__decorate([
    Decorator_1.listen("next")
], QueueHook.prototype, "next", null);
__decorate([
    Decorator_1.listen("finish")
], QueueHook.prototype, "finish", null);
exports.QueueHook = QueueHook;
