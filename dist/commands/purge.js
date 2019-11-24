"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../structures/Command");
const VorteEmbed_1 = __importDefault(require("../structures/VorteEmbed"));
const util_1 = require("../util");
class Cmd extends Command_1.Command {
    constructor(bot) {
        super(bot, {
            name: "purge",
            category: "Moderation",
            cooldown: 5000
        });
    }
    run(message, args) {
        if (!util_1.checkPermissions(message.member, "MANAGE_MESSAGES"))
            return message.channel.send(new VorteEmbed_1.default(message).errorEmbed("Missing Permissions!"));
        if (!args[0])
            return message.channel.send(new VorteEmbed_1.default(message).baseEmbed().setDescription("Please provide a number."));
        const num = parseInt(args[0]);
        const member = message.mentions.users.first() || message.guild.members.find(x => x.displayName === args[0] || x.id === args[0]);
        if (member) {
            message.channel.messages.fetch({
                limit: num
            }).then((messages) => {
                messages = messages.filter(m => m.id === member.id);
                message.channel.bulkDelete(messages);
                message.channel.send(new VorteEmbed_1.default(message).baseEmbed().setDescription(`Successfully deleted ${num} messages.`));
            });
        }
        else {
            message.channel.bulkDelete(num);
            message.channel.send(new VorteEmbed_1.default(message).baseEmbed().setDescription(`Successfully deleted ${num} messages.`));
        }
        ;
    }
}
exports.Cmd = Cmd;
;
