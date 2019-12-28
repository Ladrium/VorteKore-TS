import { ICommandOptions, PermissionGetter, Permissions } from "../../interfaces/IData";
import { VorteMessage } from "./Message";
import { VorteModule } from "./Module";
import Logger from "@ayana/logger";

export abstract class Command extends VorteModule {
	static logger: Logger = Logger.get(Command);

  public currentCooldowns: Map<string, number> = new Map();
	public logger: Logger = Command.logger;
  public aliases: string[];
  public usage: string;
  public description: string;
  public example: string;
  public cooldown: number;
  public userPermissions: Permissions | PermissionGetter = [];
  public botPermissions: Permissions | PermissionGetter = [];
  public devOnly: boolean;
  public permsCheckAdmin: boolean;
  public channel?: "guild" | "dm";
  public disabledMessage?: string;

  public constructor(
    name: string,
    options: ICommandOptions
  ) {
    super(name, options);

    const {
      aliases = [],
      cooldown = 2000,
      description = "",
      example = "",
      usage = "",
      botPermissions = this.botPermissions,
      userPermissions = this.userPermissions,
      devOnly = false,
      channel,
      permsCheckAdmin = true,
      disabledMessage
    }: ICommandOptions = options;

    this.botPermissions = typeof botPermissions === "function" ? botPermissions.bind(this) : botPermissions;
    this.userPermissions = typeof userPermissions === "function" ? userPermissions.bind(this) : userPermissions;

    this.disabledMessage = disabledMessage;
    this.aliases = aliases;
    this.permsCheckAdmin = permsCheckAdmin;
    this.usage = usage;
    this.description = description;
    this.example = example;
    this.cooldown = cooldown;
    this.devOnly = devOnly;
    this.channel = channel
  }

  public async abstract run(message: VorteMessage, args?: any[]): Promise<any>;
}