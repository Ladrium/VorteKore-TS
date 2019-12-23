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
class default_1 extends Command_1.Command {
    constructor() {
        super("pause", {
            aliases: ["stop"],
            category: "Music",
            cooldown: 0
        });
    }
    run({ guild, member, reply, channel }, query, gui) {
        return __awaiter(this, void 0, void 0, function* () {
            const player = this.bot.andesite.players.get(guild.id);
            if (!player)
                return reply(` There's nothing being played`);
            if (player.paused)
                return reply(` Nothing is being played, use  ${gui.prefix}resume to resume or ${gui.prefix}play <query> to play`);
            yield player.pause();
            channel.send(`Successfully paused the music`);
        });
    }
}
exports.default = default_1;
