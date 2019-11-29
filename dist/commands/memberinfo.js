"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../structures/Command");
const VorteEmbed_1 = __importDefault(require("../structures/VorteEmbed"));
class Cmd extends Command_1.Command {
    constructor(bot) {
        super(bot, {
            name: "memberinfo",
            category: "Utility",
            cooldown: 5000,
            aliases: ["mi", "ui", "meminfo"],
            description: "!ui @user"
        });
    }
    run(message, [mem]) {
        let per = message.member;
        if (mem) {
            per = message.guild.members.find(a => a.displayName === mem || a.id === mem) || null;
        }
        ;
        if (!per)
            return message.channel.send(`Unable to `);
        new VorteEmbed_1.default(message).baseEmbed().setDescription(`**>** Name: ${per.user.tag}
     **>** Joined At: ${per.joinedAt}
     **>** Presence: ${per.presence.status}
     **>** Roles: ${per.roles.array().toString().replace('@everyone', '')}`);
    }
}
exports.Cmd = Cmd;
;
