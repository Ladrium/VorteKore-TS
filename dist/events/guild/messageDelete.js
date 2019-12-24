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
        super("message-deleted", {
            category: "guild",
            event: "messageDelete"
        });
    }
    run(deletedMessage, bot = this.bot) {
        return __awaiter(this, void 0, void 0, function* () {
            const guild = new lib_1.VorteGuild(deletedMessage.guild);
            const { channel, enabled } = guild.getLog("deleteMessage");
            if (!enabled)
                return;
            const chan = deletedMessage.guild.channels.get(channel);
            guild.increaseCase();
            chan.send(new lib_1.VorteEmbed(deletedMessage)
                .baseEmbed()
                .setDescription(`Event: Message Deleted [Case ID: ${guild.case}]\nUser: ${deletedMessage.author.tag} (${deletedMessage.author.id})\nMessage: ${deletedMessage.content}`).setTimestamp());
        });
    }
    ;
}
exports.default = default_1;
