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
const Command_1 = require("../../structures/Command");
class default_1 extends Command_1.Command {
    constructor() {
        super("leave", {
            aliases: ["stop"],
            category: "Music",
            cooldown: 0
        });
    }
    run(message, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const player = this.bot.andesite.players.get(message.guild.id);
            if (!player)
                return message.reply(" Bot is not playing music");
            yield player.stop();
            return message.channel.send(new structures_1.VorteEmbed(message).baseEmbed().setDescription("Successfully left the channel"));
        });
    }
}
exports.default = default_1;
