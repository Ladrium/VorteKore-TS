"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../structures/Command");
const VorteEmbed_1 = __importDefault(require("../structures/VorteEmbed"));
const Guild_1 = require("../structures/Guild");
class Cmd extends Command_1.Command {
    constructor(bot) {
        super(bot, {
            name: "ban",
            category: "Information",
            cooldown: 5000
        });
    }
    run(message, args, guild) {
        message.delete().catch();
        if (!args[0])
            return new VorteEmbed_1.default(message).baseEmbed().setDescription("Please provide a user to ban");
        let member = message.mentions.members.first() || message.guild.members.find((r) => {
            return r.displayName === args[0];
        }) || message.guild.members.get(args[0]);
        if (!member)
            return message.channel.send("Invalid username|id provided");
        if (!args[1]) {
            return new VorteEmbed_1.default(message).baseEmbed().setDescription("Please provide a specific reason.");
        }
        const reason = args.slice(2).join(" ");
        member.ban({
            reason: reason
        });
        console.log(Guild_1.VorteGuild);
        message.channel.send("Succesfully banned the user.");
        const logChannel = member.guild.channels.find(channel => channel.id == "632460737146519552");
        if (!logChannel)
            return;
        if (!((logChannel) => logChannel.type === 'text')(logChannel))
            return;
        logChannel.send(new VorteEmbed_1.default(message).baseEmbed().setTimestamp().setDescription(`**>** Executor: ${message.author.tag} (${message.author.id})
        **>** Banned: ${member.user.tag} (${member.user.id})
        **>** Reason: ${reason}
        `));
    }
}
exports.Cmd = Cmd;
;
