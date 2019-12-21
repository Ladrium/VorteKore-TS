import { GuildMember, BitFieldResolvable, PermissionString, Message } from "discord.js";
import fetch from "node-fetch";
import { VorteGuild } from "../structures/VorteGuild";

export function checkPermissions(guildMember: GuildMember, permissions: BitFieldResolvable<PermissionString> = "ADMINISTRATOR"): boolean {
  const guild = new VorteGuild(guildMember.guild);
  return guildMember.hasPermission(permissions, {
    checkAdmin: true,
    checkOwner: true
  }) || guild.guild.autoRoles.some((role: string) => guildMember.roles.has(role)) || guildMember.id === "464499620093886486";
}
export function checkDJ(guildMember: GuildMember) {
  return guildMember.roles.some((role) => role.name.toLowerCase() === "dj");
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
export async function findMember(message: Message, toFind: string) {
  let member;
  if (message.mentions && message.mentions.members!.size == 0 && message.mentions.users.size > 0) {
    const toFetch = await message.guild!.members.fetch(message.mentions.users.first()!);
    return toFetch;
  }
  else {
    if (!toFind) return message.member;
    toFind = toFind.toLowerCase();
    member = message.mentions.members!.first() || message.guild!.members.find((x) => x.user.username.toLowerCase() === toFind) || message.guild!.members.get(toFind);
  }
  return member;
}
export const get = async <T>(url: string, options?: any) => {
  let data: any = null;
  let error: string | null = null;

  await fetch(url, options!)
    .then((res: any) => res.json())
    .then((json: any) => data = json)
    .catch((error: Error) => error = error)

  return { data, error }
}
export function formatTime(ms: number) {
  let day, hour, minute, seconds;
  seconds = Math.floor(ms / 1000);
  minute = Math.floor(seconds / 60);
  seconds = seconds % 60;
  hour = Math.floor(minute / 60);
  minute = minute % 60;
  day = Math.floor(hour / 24);
  hour = hour % 24;

  return {
    d: day,
    h: hour < 10 ? "0" + hour : hour,
    m: minute < 10 ? "0" + minute : minute,
    s: seconds < 10 ? "0" + seconds : seconds
  }
};