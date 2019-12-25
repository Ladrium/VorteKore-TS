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
    run(message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!args[0])
                return message.sem("Please provide a number.", { type: "error" });
            const member = message.mentions.users.first() || message.guild.members.find(x => x.displayName === args[0] || x.id === args[0]);
            if (member) {
                const num = parseInt(args[1]);
                message.channel.messages.fetch({
                    limit: num
                }).then((messages) => __awaiter(this, void 0, void 0, function* () {
                    messages = messages.filter(m => m.author.id === member.id);
                    yield message.channel.bulkDelete(messages);
                    message.sem(`Successfully deleted ${num} messages.`);
                }));
            }
            else {
                const num = parseInt(args[0]);
                yield message.channel.bulkDelete(num);
                message.sem(`Successfully deleted ${num} messages.`);
            }
            ;
        });
    }
}
exports.default = default_1;
;
