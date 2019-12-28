"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../../lib/classes/Command");
class default_1 extends Command_1.Command {
    constructor() {
        super("purge", {
            category: "Moderation",
            cooldown: 5000,
            description: "Purge a number of messages",
            example: "!purge 20 @2D",
            userPermissions: ["MANAGE_MESSAGES"],
            channel: "guild",
            usage: "<amount> [member]"
        });
    }
    async run(message, args) {
        if (!args[0])
            return message.sem("Please provide a number.", { type: "error" });
        const member = message.mentions.users.first() || message.guild.members.find(x => x.displayName === args[0] || x.id === args[0]);
        if (member) {
            const num = parseInt(args[1]);
            message.channel.messages.fetch({
                limit: num
            }).then(async (messages) => {
                messages = messages.filter(m => m.author.id === member.id);
                await message.channel.bulkDelete(messages);
                message.sem(`Successfully deleted ${num} messages.`);
            });
        }
        else {
            const num = parseInt(args[0]);
            await message.channel.bulkDelete(num);
            message.sem(`Successfully deleted ${num} messages.`);
        }
        ;
    }
}
exports.default = default_1;
;
