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
class default_1 extends lib_1.Command {
    constructor() {
        super("kick", {
            category: "Moderation",
            description: "Kicks a member",
            example: "!ban @2D mass pinging",
            userPermissions: ["KICK_MEMBERS"],
            channel: "guild",
            usage: "<member> [reason]"
        });
    }
    run(message, [mem, ...reason], guild = message.getGuild()) {
        return __awaiter(this, void 0, void 0, function* () {
            if (message.deletable)
                yield message.delete();
            if (!mem)
                return message.sem("Please provide a user to ban");
            const member = message.mentions.members.first() || message.guild.members.find((r) => {
                return r.displayName === mem;
            }) || message.guild.members.get(mem);
            if (!member)
                return message.channel.send("Couldn't find that user!");
            if (message.author.id === member.user.id)
                return message.sem("You can't ban yourself");
            if (message.member.roles.highest <= member.roles.highest)
                return message.sem("The user has higher role than you.");
            reason = reason[0] ? reason.join(" ") : "No Reason";
            try {
                yield member.kick(reason);
                message.sem("Succesfully kicked the member.");
            }
            catch (error) {
                console.error(`kick command`, error);
                return message.sem(`Sorry, we ran into an error.`, { type: "error" });
            }
            const { channel, enabled } = guild.getLog("ban");
            guild.increaseCase();
            if (!enabled)
                return;
            const logChannel = member.guild.channels.get(channel.id);
            logChannel.send(new lib_1.VorteEmbed(message).baseEmbed().setTimestamp()
                .setAuthor(`Moderation: Channel Lockdown (Case ID: ${guild.case})`, message.author.displayAvatarURL())
                .setDescription([
                `**>** Staff: ${message.author.tag} (${message.author.id})`,
                `**>** Kicked: ${member.user.tag} (${member.user.id})`,
                `**>** Reason: ${reason ? reason : "No reason"}`
            ].join("\n")));
        });
    }
}
exports.default = default_1;
;
