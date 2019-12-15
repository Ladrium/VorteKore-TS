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
const Command_1 = require("../structures/Command");
const util_1 = require("../util");
class Cmd extends Command_1.Command {
    constructor(bot) {
        super(bot, {
            name: "skip",
            category: "Music",
            cooldown: 0
        });
    }
    run({ guild, member, reply, channel }, query) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!util_1.checkDJ(member) && !util_1.checkPermissions(member, "ADMINISTRATOR"))
                return channel.send("You don't have permissions for this command!");
            const player = this.bot.player.lavalink.get(guild.id);
            const queue = this.bot.player.queue.getQueue(guild);
            queue.queue = queue.queue.slice(1);
            const nextSong = queue.nextSong();
            if (!player || !player.playing)
                return channel.send("The bot isn't playing any music yet!");
            player.play(nextSong).on("end", (data) => {
                this.bot.emit("songEnd", data, player, queue, { guild, channel });
            });
        });
    }
}
exports.Cmd = Cmd;
