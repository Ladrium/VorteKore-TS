import { VorteModuleOptions, VorteMessage } from "../lib";
import { PermissionFlags } from "discord.js";

export type Permissions = keyof PermissionFlags | (keyof PermissionFlags)[];
export type PermissionGetter = (message: VorteMessage) => Permissions | string | string[] | undefined;

export interface ICommandOptions extends VorteModuleOptions {
  aliases?: string[];
  description?: string;
  usage?: string;
  example?: string;
  cooldown?: number;
  userPermissions?: Permissions | PermissionGetter;
  botPermissions?: Permissions | PermissionGetter;
  devOnly?: boolean;
  channel?: "guild" | "dm";
  permsCheckAdmin?: boolean;
}