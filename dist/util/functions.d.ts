import { GuildMember, BitFieldResolvable, PermissionString } from "discord.js";
export declare function checkPermissions(guildMember: GuildMember, permissions?: BitFieldResolvable<PermissionString>): boolean;
