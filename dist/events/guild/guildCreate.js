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
const lib_2 = require("../../lib");
class default_1 extends lib_2.Event {
    constructor() {
        super("guild-created", {
            category: "guild",
            event: "guildCreate"
        });
    }
    run(guild) {
        return __awaiter(this, void 0, void 0, function* () {
            yield new lib_1.VorteGuild(guild)._init();
        });
    }
    ;
}
exports.default = default_1;
