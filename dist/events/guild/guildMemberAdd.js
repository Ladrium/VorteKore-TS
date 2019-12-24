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
const util_1 = require("../../util");
class default_1 extends lib_1.Event {
    constructor() {
        super("new-member", {
            category: "guild",
            event: "guildMemberAdd"
        });
    }
    run(member) {
        return __awaiter(this, void 0, void 0, function* () {
            const guild = yield new lib_1.VorteGuild(member.guild);
            const { channel, enabled, message } = guild.welcome;
            if (!enabled)
                return;
            const welcomeChannel = member.guild.channels.get(channel);
            if (!welcomeChannel)
                return;
            welcomeChannel.send(util_1.formatString(message, member));
        });
    }
    ;
}
exports.default = default_1;
