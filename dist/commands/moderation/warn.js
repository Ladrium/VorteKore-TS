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
        super("warn", {
            category: "Moderation",
            cooldown: 5000,
            description: "Warns a member",
            usage: "<@member> [reason]",
            example: "!warn @Johna3212#1708 not following rules",
            channel: "guild",
            userPermissions: ["MANAGE_GUILD"]
        });
    }
    run(message, args, guild = message.getGuild()) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!args[0])
                return message.channel.send(new lib_1.VorteEmbed(message).baseEmbed().setDescription("Please provide a user to warn."));
            const member = message.mentions.members.first() || message.guild.members.find(r => r.displayName === args[0] || r.id === args[0]);
            const reason = args.slice(1).join(" ") || "No Reason.";
            if (!member)
                return message.channel.send(new lib_1.VorteEmbed(message).baseEmbed().setDescription("Couldn't find that user!"));
            member.user.send(`You have been warned due to **${reason}**`);
            const { channel, enabled } = guild.getLog("warn");
            if (!enabled)
                return;
            guild.increaseCase();
            const chan = message.guild.channels.get(channel.id);
            chan.send(new lib_1.VorteEmbed(message)
                .baseEmbed()
                .setTitle(`Moderation: Warn [Case ID: ${guild.case}]`)
                .setDescription(`**>**Executor: ${message.author.tag} (${message.author.id})\n**>**Warn: ${member.user.tag} (${member.user.id})\n**>**Reason: ${reason}`)
                .setTimestamp());
        });
    }
}
exports.default = default_1;
;
