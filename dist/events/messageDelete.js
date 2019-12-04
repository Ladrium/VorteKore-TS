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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const VorteGuild_1 = require("../structures/VorteGuild");
const VorteEmbed_1 = __importDefault(require("../structures/VorteEmbed"));
module.exports = (bot, deletedMessage) => __awaiter(void 0, void 0, void 0, function* () {
    const guild = yield new VorteGuild_1.VorteGuild()._load(deletedMessage.guild);
    const { channel, enabled } = guild.getLog("deleteMessage");
    if (!enabled)
        return;
    const chan = deletedMessage.guild.channels.get(channel.id);
    guild.increaseCase();
    chan.send(new VorteEmbed_1.default(deletedMessage)
        .baseEmbed()
        .setDescription(`Event: Message Deleted [Case ID: ${guild.case}]\nUser: ${deletedMessage.author.tag} (${deletedMessage.author.id})\nMessage: ${deletedMessage.content}`).setTimestamp());
});
