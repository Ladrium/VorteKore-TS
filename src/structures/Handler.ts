import { VorteClient } from "./VorteClient";
import { readdirSync } from "fs";
import { Message } from "discord.js";
import { dirname } from "path";

export class Handler {
  bot: VorteClient;
  constructor(client: VorteClient) {
    this.bot = client;
    this.loadEvents = this.loadEvents.bind(this);
    this.loadCommands = this.loadCommands.bind(this);
  }
  runCommand(message: Message, prefix: string): void {
    if (message.author.bot || !message.guild) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift();

    const command = this.bot.commands.get(cmd!) || this.bot.commands.get(this.bot.aliases.get(cmd!)!) || null
    if (command) command.run(message, args);
  }
  loadEvents = (): boolean | void => {
    console.log("Loading Events...");
    const files = readdirSync("./events");
    if (!files[0]) return console.log("No events found!");
    for (const file of files) {
      if (!file.endsWith(".d.ts")) {
        if (!file.endsWith(".js")) return console.log(`[❌] => ${file} doesn't end with .js`);

        const event = require(`${dirname(require.main!.filename)}/events/${file}`);
        const eventName = file.split(".")[0];

        this.bot.on(eventName, event.bind(null, this.bot));
        console.log(`[✅] => Successfully loaded event: ${file}`);
      }
    }
    console.log("Loaded all Events!");
  }
  loadCommands = (): void | boolean => {
    console.log("Loading Commands...");
    const files = readdirSync("./commands");
    if (!files[0]) return console.log("No commands found!");
    for (const file of files) {
      if (!file.endsWith(".d.ts")) {
        console.log(file);
        if (!file.endsWith(".js")) console.log(`[❌] => ${file} doesn't end with .js`)
        let Cmd = require(`${dirname(require.main!.filename)}/commands/${file}`);
  
        try {
          Cmd = new Cmd(this.bot);
          this.bot.commands.set(Cmd.name, Cmd);
        } catch (e) {
          console.log(`[❌] => ${file} has an error`)
        }

        if (Cmd.aliases[0]) Cmd.aliases.forEach((alias: string) => this.bot.aliases.set(alias, Cmd.name));

        console.log(`[✅] => Successfully loaded command: ${file}`);
      }
    }
    console.log("Loaded all commands!");
  }
  getCommand(name: string): any {
    return this.bot.commands.get(name) || this.bot.commands.get(this.bot.aliases.get(name)!) || null;
  }
  getAllCommands(): object {
    return {
      commands: this.bot.commands.map((x) => x),
      size: this.bot.commands.size
    }
  }
};