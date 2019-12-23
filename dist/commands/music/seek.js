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
const Command_1 = require("../../structures/Command");
const util_1 = require("../../util");
class default_1 extends Command_1.Command {
    constructor() {
        super("seek", {
            category: "Music",
            cooldown: 0,
            example: "!seek 5s"
        });
    }
    run({ guild, member, reply, channel }, [time]) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!util_1.checkDJ(member) && !util_1.checkPermissions(member, "ADMINISTRATOR"))
                return channel.send("You don't have permissions for this command!");
            const player = this.bot.andesite.players.get(guild.id);
            if (!player || !player.playing)
                return channel.send("The bot isn't playing any music yet!");
            const match = time.match(/(.*)s/);
            if (!match || !match[1])
                return channel.send("Please provide a time to skip in (provide it in seconds, Example: !seek 5s)");
            let number = parseInt(match[1]);
            if (isNaN(number) || match[1].includes("-"))
                return channel.send("Provide a correct time to seek to (Example: !seek 5s)");
            number = number * 1000;
            player.seek(number);
        });
    }
}
exports.default = default_1;
