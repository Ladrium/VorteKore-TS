"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ms_1 = __importDefault(require("ms"));
const lib_1 = require("../../lib");
const Command_1 = require("../../lib/classes/Command");
class default_1 extends Command_1.Command {
    constructor() {
        super("mute", {
            category: "Moderation",
            description: "Mutes a member",
            usage: "<member> <duration>",
            example: "!mute @user 10m",
            userPermissions: ["MUTE_MEMBERS"],
            channel: "guild"
        });
    }
    async run(message, args) {
        if (message.deletable)
            await message.delete();
        if (!(args[0] && args[1] && args[2]))
            return message.sem("Please provide a mute duration, member to mute, and a reason.", { type: "error" });
        const member = message.mentions.members.first() || message.guild.members.find(r => r.displayName === args[0] || r.id === args[0]);
        if (!member)
            return message.sem("Invalid member provided");
        const time = ms_1.default(args[1]);
        if (!time)
            return message.sem("Please provide a valid time");
        const muteRole = message.guild.roles.find((x) => x.name.toLowerCase() === "muted") ||
            await message.guild.roles.create({
                data: {
                    name: "Muted",
                    color: "#1f1e1c"
                }
            });
        try {
            await member.roles.add(muteRole);
            message.sem("Successfully muted that member.");
        }
        catch (error) {
            console.error(`mute command`, error);
            return message.sem(`Sorry, I ran into an error. Please contact the developers too see if they can help!`);
        }
        const reason = args.slice(2).join(" ");
        const _case = await this.bot.database.newCase(message.guild.id, {
            type: "mute",
            subject: member.id,
            reason,
            amount: time,
            moderator: message.author.id
        });
        if (!message._guild.logs.channel || !message._guild.logs.mute)
            return;
        const logChannel = member.guild.channels.get(message._guild.logs.channel);
        logChannel.send(new lib_1.VorteEmbed(message)
            .baseEmbed()
            .setTitle(`Moderation: Mute [Case ID: ${_case.id}]`)
            .setDescription([
            `**Staff**: ${message.author.tag} (${message.author.id})`,
            `**Muted**: ${member.user.tag}`,
            `**Time**: ${time}`,
            `**Reason**: ${reason}`
        ].join("\n")).setTimestamp());
    }
}
exports.default = default_1;
;
