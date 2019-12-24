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
const lib_1 = require("../../lib");
class default_1 extends lib_1.Event {
    constructor() {
        super("message-received", {
            category: "guild",
            event: "message"
        });
        this.coins = (max, min) => Math.floor(Math.random() * max) + min;
        this.xp = (max, min) => Math.floor(Math.random() * max) + min;
        this.recently = new Set();
    }
    run(message, bot = this.bot) {
        return __awaiter(this, void 0, void 0, function* () {
            if (message.author.bot || !message.guild)
                return;
            const member = yield new lib_1.VorteMember(message.author.id, message.guild.id)._init();
            if (!this.recently.has(message.author.id)) {
                if (Math.random() > 0.50) {
                    member.add("coins", this.coins(50, 5));
                    if (Math.random() > 0.60) {
                        member.add("xp", this.xp(25, 2));
                        if (member.xp > 2 * (75 * member.level)) {
                            member.add("level", 1);
                            message.sem(`Congrats! Your new level is **${member.level}**`);
                        }
                    }
                    member.save();
                    this.recently.add(message.author.id);
                    setTimeout(() => this.recently.delete(message.author.id), 25000);
                }
            }
            this.handler.runCommand(message, member);
        });
    }
    ;
}
exports.default = default_1;
