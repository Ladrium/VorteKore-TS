"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../structures/Command");
const VorteEmbed_1 = __importDefault(require("../structures/VorteEmbed"));
const ms = require("ms");
const util_1 = require("../util");
class Cmd extends Command_1.Command {
    constructor(bot) {
        super(bot, {
            name: "lockdown",
            category: "Moderation",
            cooldown: 5000
        });
    }
    run(message, args, guild) {
        if (!util_1.checkPermissions(message.member, "MANAGE_CHANNELS"))
            return message.channel.send(new VorteEmbed_1.default(message).errorEmbed("Missing Permissions!"));
        const chan = message.channel;
        if (!args[0])
            return message.channel.send(new VorteEmbed_1.default(message).baseEmbed().setDescription("Please provide a reason to lockdown this channel."));
        if (args[0].toLowerCase() === 'release' || 'unlock' || 'remove') {
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
                return message.channel.send(new VorteEmbed_1.default(message).baseEmbed().setDescription("Unable to resolve the time"));
            const reason = args.slice(2).join(" ");
            chan.overwritePermissions({
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
                message.channel.send("Successfully unlocked the channel.");
            }, time);
            const { channel, enabled } = guild.getLog("lockdown");
            if (!enabled)
                return;
            guild.increaseCase();
            const cha = message.guild.channels.get(channel.id);
            cha.send('Succesfully locked the channel');
        }
    }
}
exports.Cmd = Cmd;
;
