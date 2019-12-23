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
const structures_1 = require("../../structures");
const Command_1 = require("../../structures/Command");
const util_1 = require("../../util");
class default_1 extends Command_1.Command {
    constructor() {
        super("mute", {
            category: "Moderation",
            cooldown: 0,
            description: "Mutes a member",
            example: "!mute @user 10m"
        });
    }
    run(message, args, guild) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!util_1.checkPermissions(message.member, "MANAGE_ROLES"))
                return message.channel.send(new structures_1.VorteEmbed(message).errorEmbed("Missing Permissions!"));
            message.delete();
            if (!args[0])
                return message.channel.send(new structures_1.VorteEmbed(message).baseEmbed().setDescription("Please provide a user to mute"));
            if (!args[1])
                return message.channel.send(new structures_1.VorteEmbed(message).baseEmbed().setDescription("Please provide a time."));
            const member = message.mentions.members.first() || message.guild.members.find(r => r.displayName === args[0] || r.id === args[0]);
            if (!member)
                return message.channel.send(new structures_1.VorteEmbed(message).baseEmbed().setDescription("Invalid member provided"));
            const time = ms_1.default(args[1]);
            if (!time)
                return message.channel.send(new structures_1.VorteEmbed(message).baseEmbed().setDescription("Please provide a valid time"));
            const muteRole = message.guild.roles.find((x) => x.name.toLowerCase() === "muted") ||
                (yield message.guild.roles.create({
                    data: {
                        name: "Muted",
                        color: "#1f1e1c"
                    }
                }));
            member.roles.add(muteRole);
            const mute = new structures_1.Mute(member.id, message.guild.id);
            mute._load().setTime(time);
            message.channel.send("Successfully muted the user");
            const { channel, enabled } = guild.getLog("mute");
            if (!enabled)
                return;
            guild.increaseCase();
            message.guild.channels.get(channel.id).send(new structures_1.VorteEmbed(message)
                .baseEmbed()
                .setTitle(`Moderation: Mute [Case ID: ${guild.case}]`)
                .setDescription(`**>** Muted: ${member.user.tag}\n**>** Muted By: ${message.author.tag}\n**>** Time: ${time}`));
        });
    }
}
exports.default = default_1;
;
