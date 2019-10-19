import { Client, ClientOptions, Collection } from "discord.js";

export class VorteClient extends Client { 
  commands: Collection<string, any>;
  aliases: Collection<string, string>;
  constructor(options?: ClientOptions) {
    super(options);
    this.commands = new Collection();
    this.aliases = new Collection();
    this.on("ready", () => {
      console.log(`${this.user!.username} is ready to rumble!`);
    })
  }
}