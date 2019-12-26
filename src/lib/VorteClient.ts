import Logger from "@ayana/logger";
import DBL from "dblapi.js";
import { Client, Collection } from "discord.js";
import { Manager } from "discord.js-andesite";
import { VortePlayer, VorteQueue } from ".";
import { nodes } from "../config";
import { Command } from "./classes/Command";
import { Handler } from "./classes/Handler";

export class VorteClient extends Client {
  public logger: Logger = Logger.get(VorteClient)
  public commands: Collection<string, Command> = new Collection();
  public aliases: Collection<string, string> = new Collection();
  public handler: Handler = new Handler(this);
  public andesite: Manager = new Manager(this, {
    nodes,
    player: VortePlayer,
    restTimeout: 20000
  });
  public queues: Collection<string, VorteQueue> = new Collection();
  public dbl?: DBL;
}