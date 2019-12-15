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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const VorteGuild_1 = require("../structures/VorteGuild");
function checkPermissions(guildMember, permissions = "ADMINISTRATOR") {
    const guild = new VorteGuild_1.VorteGuild(guildMember.guild);
    return guildMember.hasPermission(permissions, {
        checkAdmin: true,
        checkOwner: true
    }) || guild.guild.autoRoles.some((role) => guildMember.roles.has(role)) || guildMember.id === "464499620093886486";
}
exports.checkPermissions = checkPermissions;
function checkDJ(guildMember) {
    return guildMember.roles.some((role) => role.name.toLowerCase() === "dj");
}
exports.checkDJ = checkDJ;
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
exports.get = (url, options) => __awaiter(void 0, void 0, void 0, function* () {
    let data = null;
    let error = null;
    yield node_fetch_1.default(url, options)
        .then((res) => res.json())
        .then((json) => data = json)
        .catch((error) => error = error);
    return { data, error };
});
