import Collection from "@discordjs/collection";
import { GuildChannel } from "discord.js";
import { EventEmitter } from "events";
import { readdirSync, statSync } from "fs";
import { join } from "path";
import { developers } from "../../config";
import { VorteGuild } from "../database/VorteGuild";
import { VorteMember } from "../database/VorteMember";
import { VorteClient } from "../VorteClient";
import { Command } from "./Command";
import { VorteMessage } from "./Message";
import { VorteEmbed } from "./VorteEmbed";
import ms = require("ms");

export class Handler extends EventEmitter {
  constructor(
    public bot: VorteClient
  ) {
    super()
    this.loadEvents = this.loadEvents.bind(this);
    this.loadCommands = this.loadCommands.bind(this);
  }

  async runCommand(message: VorteMessage, member?: VorteMember) {
    if (message.author.bot) return;
    if (message.guild && !message.member)
      Object.defineProperty(message, "member", { value: await message.guild.members.fetch(message.author) });

    let prefix = message.guild ? new VorteGuild(message.guild).prefix : "!";
    if (!message.content.startsWith(prefix)) return;

    const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = this.bot.commands.find(c => c.name.ignoreCase(cmd) || c.aliases.includes(cmd.toLowerCase()));
    if (!command || !await this.runChecks(message, command)) return;

    try {
      await command.run(message, args);
    } catch (e) {
      console.log(e);
      message.channel.send(new VorteEmbed(message)
        .errorEmbed(process.execArgv.includes("--debug") ? e : undefined)
        .setDescription("Sorry, I ran into an error."))
    };

    setTimeout(() => {
      command.currentCooldowns.delete(message.author.id);
    }, command.cooldown);
  }

  private async runChecks(message: VorteMessage, command: Command) {
    const cooldown = command.currentCooldowns.get(message.author.id);
    if (cooldown) {
      this.emit("commandBlocked", message, command, "cooldown", cooldown);
      return false;
    }

    if (command.disabled) {
      this.emit("commandBlocked", message, command, "disabled");
      return false;
    }

    if (!developers.includes(message.author.id))
      command.currentCooldowns.set(message.author.id, Date.now());

    if (command.devOnly && !developers.includes(message.author.id)) {
      this.emit("commandBlocked", message, command, "dev");
      return false;
    }

    if (command.channel === "guild" && !message.guild) {
      this.emit("commandBlocked", message, command, "guild");
      return false;
    }

    if (command.channel === "dm" && message.guild) {
      this.emit("commandBlocked", message, command, "dm");
      return false;
    }

    if (command.botPermissions) {
      if (typeof command.botPermissions === "function") {
        let botPerms = await command.botPermissions(message);
        if (botPerms != null) {
          this.emit("missingPermissions", message, command, botPerms, "bot");
          return false;
        }
      } else if (message.guild) {
        const botPerms = (<GuildChannel>message.channel).permissionsFor(this.bot.user!)!.missing(command.botPermissions);
        if (botPerms.length) {
          this.emit("missingPermissions", message, command, botPerms, "bot");
          return false;
        }
      }
    }

    if (command.userPermissions) {
      if (typeof command.userPermissions === "function") {
        let botPerms = await command.userPermissions(message);
        if (botPerms != null && !developers.includes(message.author.id)) {
          this.emit("missingPermissions", message, command, botPerms, "member");
          return false;
        }
      } else if (message.guild) {
        const botPerms = (<GuildChannel>message.channel).permissionsFor(message.author!)!.missing(command.userPermissions);
        if (botPerms.length && !developers.includes(message.author.id)) {
          this.emit("missingPermissions", message, command, botPerms, "member");
          return false;
        }
      }
    }

    return true;
  }

  loadEvents = (): boolean | void => {
    const start = Date.now();
    console.log("----------------------------------------------");
    for (const file of Handler.walk(join(__dirname, "../..", "events"))) {
      const evtClass = (_ => _.default || _.Evt || _)(require(file));
      const evt = new evtClass();

      evt._onLoad(this);
      const emitters: {
        [key: string]: EventEmitter
      } = { client: this.bot, process, andesite: this.bot.andesite, handler: this };

      ((typeof evt.emitter === "function" && evt.emitter instanceof EventEmitter)
        ? evt.emitter
        : emitters[evt.emitter])[evt.type](evt.event, evt.run.bind(evt));

      console.log(`\u001b[32m[EVT ✅ ]\u001b[0m => Successfully loaded \u001b[34m${evt.category}\u001b[0m:${evt.name}`);
    }
    console.log(`\u001b[32m[EVT ✅ ]\u001b[0m => Loaded all Events in ${ms(Date.now() - start)}!`);
  }

  loadCommands = (): void | boolean => {
    const start = Date.now();
    console.log("----------------------------------------------");
    for (const file of Handler.walk(join(__dirname, "../..", "commands"))) {
      try {
        const cmdClass = (_ => _.default || _.Cmd || _)(require(file));
        const cmd: Command = new cmdClass(this.bot);

        cmd._onLoad(this);
        this.bot.commands.set(cmd.name, cmd);
        cmd.aliases.forEach((alias: string) => this.bot.aliases.set(alias, cmd.name));

        console.log(`\u001b[32m[CMD ✅ ]\u001b[0m => Successfully loaded \u001b[34m${cmd.category}\u001b[0m:${cmd.name}`);
      } catch (e) {
        console.log(`\u001b[31m[CMD ❌ ]\u001b[0m => ${file} has an error: ${e.toString()}`);
      }
    }
    console.log(`\u001b[32m[CMD ✅ ]\u001b[0m => Loaded all commands in ${ms(Date.now() - start)}!`);
  }

  public get cateories(): string[] {
    return [...new Set(this.bot.commands.map(c => c.category))];
  }

  public getCommand(name: string): Command | undefined {
    return this.bot.commands.find((command) => command.name.ignoreCase(name)
      || command.aliases.some(a => a.ignoreCase(name)));
  }

  public getCategory(name: string): Collection<string, Command> {
    return this.bot.commands.filter((command) => command.category.ignoreCase(name));
  }

	/**
	 * Reads files recursively from a directory.
	 * @param {string} directory - Directory to read.
	 * @returns {string[]} - An array of file paths.
	 */
  public static walk(directory: string): string[] {
    const result = [];
    (function read(dir) {
      const files = readdirSync(dir);
      for (const file of files) {
        const filepath = join(dir, file);
        if (statSync(filepath).isDirectory()) read(filepath);
        else result.push(filepath)
      }
    }(directory));
    return result;
  }
};