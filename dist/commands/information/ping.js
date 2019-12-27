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
class default_1 extends lib_1.Command {
    constructor() {
        super("ping", {
            aliases: ["pong"],
            description: "Sends the bot & discord api ping.",
            category: "Information"
        });
    }
    run(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const start = Date.now();
            return new Promise((resolve) => {
                this.bot["api"].channels[message.channel.id].typing.post()
                    .then(() => {
                    return resolve(message.sem([
                        `**Bot Ping**: ${Math.round(this.bot.ws.ping)}ms`,
                        `**API Ping**: ${Math.round(Date.now() - start)}ms`
                    ].join("\n")));
                });
            });
        });
    }
}
exports.default = default_1;
