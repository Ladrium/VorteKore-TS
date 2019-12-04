import { GuildMember, BitFieldResolvable, PermissionString, Message } from "discord.js";
import { stringify } from "querystring";

export function checkPermissions(guildMember: GuildMember, permissions: BitFieldResolvable<PermissionString> = "ADMINISTRATOR"): boolean {
  return guildMember.hasPermission(permissions, {
    checkAdmin: true,
    checkOwner: true
  }) || guildMember.id === "464499620093886486";
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
export async function findMember (message: Message, toFind: string) {
  let member;
  if(message.mentions && message.mentions.members!.size == 0 && message.mentions.users.size > 0) {
    const toFetch = await message.guild!.members.fetch(message.mentions.users.first()!);
    return toFetch;
  }
  else{
    if(!toFind) return message.member;
    toFind = toFind.toLowerCase();
    member = message.mentions.members!.first() || message.guild!.members.find((x) => x.user.username.toLowerCase() === toFind) || message.guild!.members.get(toFind);
  }
  return member;
}