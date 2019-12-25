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
const ms = require("ms");
class default_1 extends lib_1.Command {
    constructor() {
        super("lockdown", {
            category: "Moderation",
            aliases: ["ld"],
            cooldown: 5000,
            description: "Lockdowns a channel",
            example: "!lockdown 10m time to sleep",
            userPermissions: ["MANAGE_CHANNELS"],
            botPermissions: ["MANAGE_CHANNELS"],
            channel: "guild",
            usage: "<duration> [reason]"
        });
    }
    run(message, args, guild = message.getGuild()) {
        return __awaiter(this, void 0, void 0, function* () {
            const chan = message.channel;
            if (!args[0])
                return message.sem("Please provide a reason to lockdown this channel.", { type: "error" });
            if (['release', 'unlock', 'remove'].includes(args[0])) {
                chan.overwritePermissions({
                    permissionOverwrites: [
                        {
                            id: message.guild.id,
                            allow: ['SEND_MESSAGES']
                        }
                    ]
                });
            }
            else {
                const time = ms(args[0]);
                if (!time)
                    return message.sem("Unable to resolve the time");
                const reason = args.slice(2).join(" ");
                yield chan.overwritePermissions({
                    permissionOverwrites: [
                        {
                            id: message.guild.id,
                            deny: ['SEND_MESSAGES']
                        }
                    ],
                    reason: reason ? reason : `No reason provided - ${message.author.tag}`
                });
                setTimeout(() => {
                    chan.overwritePermissions({
                        permissionOverwrites: [
                            {
                                id: message.guild.id,
                                allow: ['SEND_MESSAGES']
                            }
                        ],
                        reason: reason ? reason : `No reason provided - ${message.author.tag}`
                    });
                    message.sem("Successfully unlocked the channel.");
                }, time);
                const { channel, enabled } = guild.getLog("lockdown");
                guild.increaseCase();
                if (!enabled)
                    return;
                const cha = message.guild.channels.get(channel.id);
                cha.send(new lib_1.VorteEmbed(message).baseEmbed()
                    .setAuthor(`Moderation: Channel Lockdown (Case ID: ${guild.case})`, message.author.displayAvatarURL())
                    .setDescription([
                    `**>** Staff: ${message.author.tag} (${message.author.id})`,
                    `**>** Channel: ${chan} (${channel.id})`,
                    `**>** Reason: ${reason === undefined ? `No reason provided` : reason}`
                ].join("\n")));
            }
        });
    }
}
exports.default = default_1;
;
