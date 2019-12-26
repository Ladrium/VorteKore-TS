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
const lib_1 = require("../../lib");
const util_1 = require("../../util");
const Presence = {
    dnd: "Do Not Disturb",
    online: "Online",
    idle: "Idling",
    offline: "Offline"
};
class default_1 extends lib_1.Command {
    constructor() {
        super("userinfo", {
            category: "Information",
            cooldown: 5000,
            aliases: ["whois", "ui"],
            description: "!ui @user",
            channel: "guild"
        });
    }
    run(message, [mem]) {
        return __awaiter(this, void 0, void 0, function* () {
            const member = mem ? yield util_1.findMember(message, mem) : message.member;
            if (!member)
                return message.channel.send(`Unable to find that member!`);
            const infoEmbed = new lib_1.VorteEmbed(message).baseEmbed().setDescription([
                `**Name**: ${member.user.tag} (${member.id})`,
                `**Joined At**: ${member.joinedAt.toLocaleDateString()}`,
                `**Created At**: ${member.user.createdAt.toLocaleDateString()}`,
                `**Status**: ${Presence[member.presence.status]}`,
                `**Game**: ${this.getGame(member)}`,
                `**Roles**: ${member.roles.sorted((a, b) => b.position - a.position).filter(r => r.name !== "@everyone").map(r => r).join(" ")}`,
            ].join("\n"))
                .setThumbnail(member.user.displayAvatarURL({ size: 2048 }));
            message.channel.send(infoEmbed);
        });
    }
    getGame(member) {
        if (!member.presence.activity)
            return "None.";
    }
}
exports.default = default_1;
;
