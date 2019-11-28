"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function checkPermissions(guildMember, permissions = "ADMINISTRATOR") {
    return guildMember.hasPermission(permissions, {
        checkAdmin: true,
        checkOwner: true
    });
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
