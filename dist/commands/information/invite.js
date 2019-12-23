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
const structures_1 = require("../../structures");
class default_1 extends structures_1.Command {
    constructor() {
        super("invite", {
            category: "Information",
            cooldown: 0
        });
    }
    run(message) {
        return __awaiter(this, void 0, void 0, function* () {
            message.reply("Use this link to invite the bot: <http://bit.ly/2EmfskO>");
        });
    }
}
exports.default = default_1;
