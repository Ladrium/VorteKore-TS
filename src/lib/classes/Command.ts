import { Message } from "discord.js";
import { ICommandOptions, PermissionGetter, Permissions } from "../../interfaces/IData";
import { VorteGuild } from "../database/VorteGuild";
import { VorteMember } from "../database/VorteMember";
import { VorteModule } from "./Module";
import { VorteClient } from "../VorteClient";

export class Command extends VorteModule {
  public currentCooldowns: Map<string, number> = new Map();

  public aliases: string[];
  public usage: string;
  public description: string | undefined;
  public example: string | undefined;
  public cooldown: number;
  public userPermissions: Permissions | PermissionGetter = [];
  public botPermissions: Permissions | PermissionGetter = [];

  public constructor(

    name: string,
    options: ICommandOptions
  ) {
    super(name, options);

    const {
      aliases = [],
      category = "Main",
      cooldown = 0,
      description = "",
      disabled,
      example = "",
      usage = "",
      botPermissions = this.botPermissions,
      userPermissions = this.userPermissions
    }: ICommandOptions = options;
    
    this.botPermissions = typeof botPermissions === "function" ? botPermissions.bind(this) : botPermissions;
    this.userPermissions = typeof userPermissions === "function" ? userPermissions.bind(this) : userPermissions;

    this.aliases = aliases;
    this.category = category;
    this.usage = usage;
    this.description = description;
    this.example = example;
    this.cooldown = cooldown;
  }

  public run(message: Message, args: any[], guild: VorteGuild, member: VorteMember) {
    console.log("This command isnt added yet!");
  }
}