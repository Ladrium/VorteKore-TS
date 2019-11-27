import { GuildMember, BitFieldResolvable, PermissionString, Message } from "discord.js";
export declare function checkPermissions(guildMember: GuildMember, permissions?: BitFieldResolvable<PermissionString>): boolean;
export declare function findRole(message: Message, role: string): import("discord.js").Role | undefined;
