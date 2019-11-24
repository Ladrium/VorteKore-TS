"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function checkPermissions(guildMember, permissions = "ADMINISTRATOR") {
    return guildMember.hasPermission(permissions, {
        checkAdmin: true,
        checkOwner: true
    });
}
exports.checkPermissions = checkPermissions;
