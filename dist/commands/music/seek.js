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
const Command_1 = require("../../lib/classes/Command");
class default_1 extends Command_1.Command {
    constructor() {
        super("seek", {
            category: "Music",
            example: "!seek 5s",
            cooldown: 2000,
            channel: "guild"
        });
    }
    run(message, [time]) {
        return __awaiter(this, void 0, void 0, function* () {
            const player = this.bot.andesite.players.get(message.guild.id);
            if (!player)
                return message.sem("The bot isn't in a voice channel.");
            if (!player.in(message.member))
                return message.sem("Please join the voice channel I'm in.", { type: "error" });
            const match = time.match(/(.*)s/);
            if (!match || !match[1])
                return message.sem("Please provide a time to skip in (provide it in seconds, Example: !seek 5s)");
            let number = parseInt(match[1]);
            if (isNaN(number) || match[1].includes("-"))
                return message.sem("Provide a correct time to seek to (Example: !seek 5s)");
            number = number * 1000;
            player.seek(number);
        });
    }
}
exports.default = default_1;
