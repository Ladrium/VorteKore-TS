import { GuildMember, BitFieldResolvable, PermissionString, Message } from "discord.js";

export function checkPermissions(guildMember: GuildMember, permissions: BitFieldResolvable<PermissionString> = "ADMINISTRATOR"): boolean {
  return guildMember.hasPermission(permissions, {
    checkAdmin: true,
    checkOwner: true
  })
}
export function findRole(message: Message, role: string) {
  return message.guild!.roles.find((r) => {
    const name = r.name.toLowerCase()
    return name === role || name.toLowerCase().startsWith(role);
  })
};