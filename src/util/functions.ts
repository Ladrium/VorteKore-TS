import { GuildMember, BitFieldResolvable, PermissionString, Message } from "discord.js";
import { stringify } from "querystring";

export function checkPermissions(guildMember: GuildMember, permissions: BitFieldResolvable<PermissionString> = "ADMINISTRATOR"): boolean {
  return guildMember.hasPermission(permissions, {
    checkAdmin: true,
    checkOwner: true
  })
}
export function findRole(message: Message, role: string) {
  return message.mentions.roles.first() || message.guild!.roles.find((r) => {
    const name = r.name.toLowerCase()
    return name === role || name.toLowerCase().startsWith(role);
  })
};
export function formatString(message: string, member: GuildMember) {
  const obj = {
    "{{mention}}": member.toString(),
    "{{member}}": member.user.tag,
    "{{server}}": member.guild.name,
    "{{memberCount}}": member.guild.memberCount
  }
  const string = message.replace(new RegExp(Object.keys(obj).join("|")), (m) => obj[m as "{{mention}}"])
  return string;
}