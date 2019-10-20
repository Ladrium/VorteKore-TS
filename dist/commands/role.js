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
const Command_1 = require("../structures/Command");
class Cmd extends Command_1.Command {
    constructor(bot) {
        super(bot, {
            name: "role",
            category: "Moderation",
            cooldown: 0
        });
    }
    run(message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!args[0])
                return message.channel.send("Please provide an argument: `add`, `remove`");
            if (!args[1])
                return message.channel.send(`Please provide a member name/id`);
            const member = message.mentions.members.first() || message.guild.members.find(x => x.displayName === args[1]) || (yield message.guild.members.fetch(args[1]));
            if (!member)
                return message.channel.send("Unable to find the member");
            if (!args[2])
                return message.channel.send("Please provide a specific role");
            const role = message.mentions.roles.first() || message.guild.roles.find(r => r.name === args[2]) || message.guild.roles.get(args[2]);
            if (!role)
                return message.channel.send("Unable to find the role");
            if (args[0].toLowerCase() === 'add') {
                member.roles.add(role);
                message.channel.send(`Added the role!`);
            }
            else if (args[0] === 'remove') {
                member.roles.remove(role);
                message.channel.send("Succesfully removed the role");
            }
        });
    }
}
exports.Cmd = Cmd;
;
