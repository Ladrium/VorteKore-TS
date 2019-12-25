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
    run(message, args, guild = message.getGuild()) {
        return __awaiter(this, void 0, void 0, function* () {
            if (message.deletable)
                yield message.delete();
            if (!(args[0] && args[1]))
                return message.sem("Please provide a mute duration and member.", { type: "error" });
            const member = message.mentions.members.first() || message.guild.members.find(r => r.displayName === args[0] || r.id === args[0]);
            if (!member)
                return message.sem("Invalid member provided");
            const time = ms_1.default(args[1]);
            if (!time)
                return message.sem("Please provide a valid time");
            const muteRole = message.guild.roles.find((x) => x.name.toLowerCase() === "muted") ||
                (yield message.guild.roles.create({
                    data: {
                        name: "Muted",
                        color: "#1f1e1c"
                    }
                }));
            try {
                yield member.roles.add(muteRole);
                const mute = new lib_1.Mute(member.id, message.guild.id);
                mute._load().setTime(time);
                message.sem("Successfully muted that member.");
            }
            catch (error) {
                console.error(`mute command`, error);
                return message.sem(`Sorry, I ran into an error. Please contact the developers too see if they can help!`);
            }
            const { channel, enabled } = guild.getLog("mute");
            guild.increaseCase();
            if (!enabled)
                return;
            message.guild.channels.get(channel.id).send(new lib_1.VorteEmbed(message)
                .baseEmbed()
                .setTitle(`Moderation: Mute [Case ID: ${guild.case}]`)
                .setDescription([
                `**>** Staff: ${message.author.tag} (${message.author.id})`,
                `**>** Muted: ${member.user.tag}`,
                `**>** Time: ${time}`
            ].join("\n")));
        });
    }
}
exports.default = default_1;
;
