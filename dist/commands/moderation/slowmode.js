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
const Command_1 = require("../../lib/classes/Command");
class default_1 extends Command_1.Command {
    constructor() {
        super("slowmode", {
            category: "Moderation",
            cooldown: 3000,
            usage: "To remove the slowmode: !slowmode <remove|release|rel>\nTo add the slowmode: !slowmode <time> (reason)",
            channel: "guild",
            userPermissions: ["MANAGE_MESSAGES"]
        });
    }
    run(message, args, guild = message.getGuild()) {
        return __awaiter(this, void 0, void 0, function* () {
            const chan = message.channel;
            if (!args[0])
                return message.sem("Please provide a valid number", { type: "error" });
            if (["remove" || "release" || "rel"].includes(args[0])) {
                message.channel.send("Succesffully removed the slowmode");
                return chan.edit({
                    rateLimitPerUser: 0
                });
            }
            else {
                ;
                const sec = parseInt(args[0]);
                const reason = args.slice(1).join(" ") || "No reason provided";
                chan.edit({
                    rateLimitPerUser: sec
                });
                const { channel, enabled } = guild.getLog("slowmode");
                if (!enabled)
                    return;
                guild.increaseCase();
                const cha = message.guild.channels.get(channel.id);
                cha.send(new lib_1.VorteEmbed(message)
                    .baseEmbed()
                    .setDescription(`**>** Executor: ${message.author.tag} (${message.author.id})\n**>** Channel: ${chan.name} (${chan.id})\n**>** Reason: ${reason}`)
                    .setTimestamp());
                if (reason) {
                    message.channel.send(`This channel is in slowmode due to: ${reason}`);
                }
            }
        });
    }
}
exports.default = default_1;
;
