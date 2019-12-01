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
const VorteGuild_1 = require("../structures/VorteGuild");
const util_1 = require("../util");
module.exports = (bot, member) => __awaiter(void 0, void 0, void 0, function* () {
    const guild = yield new VorteGuild_1.VorteGuild()._load(member.guild);
    const { channel, enabled, message } = guild.leave;
    if (!enabled)
        return;
    const welcomeChannel = member.guild.channels.get(channel.id);
    if (!welcomeChannel)
        return;
    welcomeChannel.send(util_1.formatString(message, member));
});
