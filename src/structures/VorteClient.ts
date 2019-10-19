import { Client, ClientOptions, Collection } from "discord.js";
import { Handler } from "./Handler";

export class VorteClient extends Client {
  commands: Collection<string, any>;
  aliases: Collection<string, string>;
  handler: Handler | undefined;
  constructor(options?: ClientOptions) {
    super(options);
    this.commands = new Collection();
    this.aliases = new Collection();
    this.on("ready", () => {
      console.log(`${this.user!.username} is ready to rumble!`);
    })
  }
};