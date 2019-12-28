import Logger from "@ayana/logger";
import DBL from "dblapi.js";
import { Client, Collection } from "discord.js";
import { Manager } from "discord.js-andesite";
import { join } from "path";
import { VortePlayer } from ".";
import { nodes } from "../config";
import DatabasePlugin from "../plugins/database";
import ClientUtil from "../util/ClientUtil";
import { Config } from "../util/Config";
import { Command } from "./classes/Command";
import { Event } from "./classes/Event";
import { Handler } from "./classes/Handler";
import { VorteMessage } from "./classes/Message";
import { ClientPlugin } from "./Plugin";

export class VorteClient extends Client {
  public logger: Logger = Logger.get(VorteClient)

  public plugins: Collection<string, ClientPlugin> = new Collection();
  public commands: Collection<string, Command> = new Collection();
  public events: Collection<string, Event> = new Collection();

  public util: ClientUtil = new ClientUtil(this);
  public handler: Handler = new Handler(this);
  public andesite: Manager = new Manager(this, {
    nodes,
    player: VortePlayer,
    restTimeout: 20000
  });

  public dbl?: DBL;
  public prefix = (message: VorteMessage) => {
    if (!message.guild) return Config.get("node_env", false) === "development" ? "b!" : "!";
    const guild = message._guild!;
    return guild.prefixes;
  }

  public constructor() {
    super();
    this._loadPlugins();
  }

  public database!: DatabasePlugin;
  private async _loadPlugins() {
    try {
      const start = Date.now();
      for (const file of Handler.walk(join(__dirname, "../", "plugins"))) {
        try {
          const mod = (require(file));
          if (mod.default === undefined) return;

          const plugin = new (mod.default)(this);
          await plugin.onLoad();

          this.plugins.set(plugin.name, plugin);
          Object.defineProperty(this, plugin.name, { value: plugin });
        } catch (error) {
          this.logger.info(error)
        }
      }

      this.logger.info("Loaded all plugins.", `${Date.now() - start}ms`);
    } catch (error) {
      this.logger.error(error)
    }
  }
}