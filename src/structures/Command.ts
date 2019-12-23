import { Message } from "discord.js";
import { ICommandOptions } from "../interfaces/IData";
import { VorteGuild, VorteMember } from "./";
import { VorteModule } from "./Module";

export class Command extends VorteModule {
  public aliases: string[];
  public category: string;
  public usage: string;
  public description: string | undefined;
  public example: string | undefined;
  public cooldown: number;

  public constructor(
    name: string,
    {
      aliases = [],
      category = "Main",
      cooldown = 0,
      description = "",
      disabled,
      example = "",
      usage = ""
    }: ICommandOptions
  ) {
    super(name, { disabled, category })
    
    this.aliases = aliases;
    this.category = category;
    this.usage = usage;
    this.description = description;
    this.example = example;
    this.cooldown = cooldown;
  }

  public run(message: Message, args: string[] | string, guild: VorteGuild, member: VorteMember) {
    console.log("This command isnt added yet!");
  }
}