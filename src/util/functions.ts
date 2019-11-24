import { GuildMember, BitFieldResolvable, PermissionString } from "discord.js";

export function checkPermissions(guildMember: GuildMember, permissions: BitFieldResolvable<PermissionString> = "ADMINISTRATOR"): boolean {
  return guildMember.hasPermission(permissions, {
    checkAdmin: true,
    checkOwner: true
  })
}