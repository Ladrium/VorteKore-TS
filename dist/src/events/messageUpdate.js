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
const structures_1 = require("../structures");
module.exports = (bot, oldmsg, newmsg) => __awaiter(void 0, void 0, void 0, function* () {
    const guild = yield new structures_1.VorteGuild(oldmsg.guild);
    if (!oldmsg || !newmsg || oldmsg.content === newmsg.content)
        return;
    const { channel, enabled } = guild.getLog("editMessage");
    if (!enabled)
        return;
    guild.increaseCase();
    const oldcon = oldmsg.cleanContent.toString().slice(0, 900);
    const newcon = newmsg.cleanContent.toString().slice(0, 900);
    const ch = oldmsg.guild.channels.get(channel);
    if (!ch)
        return;
    ch.send(new structures_1.VorteEmbed(newmsg)
        .baseEmbed()
        .setTitle(`Event: Message Update [Case ID: ${guild.case}]\n`)
        .addField(`Old Message:`, oldcon)
        .addField(`New Message`, newcon)
        .addField(`Channel`, `<#${ch.id}> [Jump To Message]`));
});
