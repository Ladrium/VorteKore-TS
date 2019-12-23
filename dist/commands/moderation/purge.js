"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const structures_1 = require("../../structures");
const Command_1 = require("../../structures/Command");
const util_1 = require("../../util");
class default_1 extends Command_1.Command {
    constructor() {
        super("purge", {
            category: "Moderation",
            cooldown: 5000,
            description: "Purge a number of messages",
            example: "!purge @user 20"
        });
    }
    run(message, args) {
        if (!util_1.checkPermissions(message.member, "MANAGE_MESSAGES"))
            return message.channel.send(new structures_1.VorteEmbed(message).errorEmbed("Missing Permissions!"));
        if (!args[0])
            return message.channel.send(new structures_1.VorteEmbed(message).baseEmbed().setDescription("Please provide a number."));
        const member = message.mentions.users.first() || message.guild.members.find(x => x.displayName === args[0] || x.id === args[0]);
        if (member) {
            const num = parseInt(args[1]);
            message.channel.messages.fetch({
                limit: num
            }).then((messages) => {
                messages = messages.filter(m => m.author.id === member.id);
                message.channel.bulkDelete(messages);
                message.channel.send(new structures_1.VorteEmbed(message).baseEmbed().setDescription(`Successfully deleted ${num} messages.`));
            });
        }
        else {
            const num = parseInt(args[0]);
            message.channel.bulkDelete(num);
            message.channel.send(new structures_1.VorteEmbed(message).baseEmbed().setDescription(`Successfully deleted ${num} messages.`));
        }
        ;
    }
}
exports.default = default_1;
;
