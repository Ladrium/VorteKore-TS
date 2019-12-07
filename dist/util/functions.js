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
function checkPermissions(guildMember, permissions = "ADMINISTRATOR") {
    return guildMember.hasPermission(permissions, {
        checkAdmin: true,
        checkOwner: true
    }) || guildMember.id === "464499620093886486";
}
exports.checkPermissions = checkPermissions;
function findRole(message, role) {
    return message.mentions.roles.first() || message.guild.roles.find((r) => {
        const name = r.name.toLowerCase();
        return name === role || name.toLowerCase().startsWith(role);
    });
}
exports.findRole = findRole;
;
function formatString(message, member) {
    const obj = {
        "{{mention}}": member.toString(),
        "{{member}}": member.user.tag,
        "{{server}}": member.guild.name,
        "{{memberCount}}": member.guild.memberCount
    };
    const string = message.replace(new RegExp(Object.keys(obj).join("|")), (m) => obj[m]);
    return string;
}
exports.formatString = formatString;
function findMember(message, toFind) {
    return __awaiter(this, void 0, void 0, function* () {
        let member;
        if (message.mentions && message.mentions.members.size == 0 && message.mentions.users.size > 0) {
            const toFetch = yield message.guild.members.fetch(message.mentions.users.first());
            return toFetch;
        }
        else {
            if (!toFind)
                return message.member;
            toFind = toFind.toLowerCase();
            member = message.mentions.members.first() || message.guild.members.find((x) => x.user.username.toLowerCase() === toFind) || message.guild.members.get(toFind);
        }
        return member;
    });
}
exports.findMember = findMember;
exports.get = (url, options) => {
    let data = null;
    let error = null;
    fetch(url, options)
        .then(res => res.json())
        .then(json => data = json)
        .catch(error => error = error);
    return { data, error };
};
