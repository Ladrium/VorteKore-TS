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
const structures_1 = require("../structures");
const util_1 = require("../util");
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
        return __awaiter(this, void 0, void 0, function* () {
            const member = yield util_1.findMember(message, mem);
            if (!member)
                return message.channel.send(`Unable to `);
            new structures_1.VorteEmbed(message).baseEmbed().setDescription(`**>** Name: ${member.user.tag}
     **>** Joined At: ${member.joinedAt}
     **>** Presence: ${member.presence.status}
     **>** Roles: ${member.roles.array().toString().replace('@everyone', '')}`);
        });
    }
}
exports.Cmd = Cmd;
;
