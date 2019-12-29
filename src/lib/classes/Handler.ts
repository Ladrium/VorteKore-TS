import Logger from "@ayana/logger";
import Collection from "@discordjs/collection";
import { GuildChannel } from "discord.js";
import { EventEmitter } from "events";
import { readdirSync, statSync } from "fs";
import { basename, join } from "path";
import { developers } from "../../config";
import { VorteClient } from "../VorteClient";
import { Command } from "./Command";
import { VorteMessage } from "./Message";
import { VorteEmbed } from "./VorteEmbed";

export class Handler extends EventEmitter {
  public cooldowns: Collection<string, { [key: string]: {timer: NodeJS.Timer, end: number, uses: number } | null }> = new Collection();
  public logger: Logger = Logger.get(Handler);
  constructor(
    public bot: VorteClient
  ) {
    super();
  }

  public get mentionOnly(): RegExp { 
    return new RegExp(`^<@!?${this.bot.user!.id}>$`);
  }
  
  public get prefixMention(): RegExp {
    return new RegExp(`^<@!?${this.bot.user!.id}>`)
  };

  async runCommand(message: VorteMessage) {
    if (message.author.bot) return;
    if (message.guild && !message.member)
      Object.defineProperty(message, "member", { value: await message.guild.members.fetch(message.author) });

    if (this.mentionOnly.test(message.content)) return message.sem("Hello!");
    
    let prefix = await this.prefix(message);
    if (!message.content.startsWith(prefix)) return;

    const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = this.bot.commands.find(c => c.name.ignoreCase(cmd) || c.aliases.includes(cmd.toLowerCase()));
    if (!command || !await this.runChecks(message, command)) return;

    try {
      await command.run(message, args);
    } catch (e) {
      message.channel.send(new VorteEmbed(message)
        .errorEmbed(process.execArgv.includes("--debug") ? e : undefined)
        .setDescription("Sorry, I ran into an error."))
      console.log(e);
    };

    setTimeout(() => {
      command.currentCooldowns.delete(message.author.id);
    }, command.cooldown);
  }

  public prefix(message: VorteMessage): string {
    let prefix: string = "";
    if (this.bot.prefix && typeof this.bot.prefix === "function") {
      let returned = this.bot.prefix(message);
      if (Array.isArray(returned)) for (const _prefix of returned) {
        if (message.content.startsWith(_prefix)) prefix = _prefix;
      } else if (typeof returned === "string") {
        if (message.content.startsWith(returned)) prefix = returned;
      };
    } else if (typeof this.bot.prefix === "string" && message.content.startsWith(this.bot.prefix)) prefix = this.bot.prefix;
    if (!prefix) {
      if (message.content.match(this.prefixMention)) prefix = message.content.match(this.prefixMention)![0];
    }
    return prefix;
  }

  private async runChecks(message: VorteMessage, command: Command) {
    // const endTime = message.createdTimestamp + command.cooldown;

    // const id = message.author.id;
    // if (!this.cooldowns.has(id)) this.cooldowns.set(id, {});

    // if (!this.cooldowns.get(id)![command.name]) {
    //   this.cooldowns.get(id)![command.name] = {
    //     timer: this.bot.setTimeout(() => {
    //       this.bot.clearTimeout(this.cooldowns.get(id)![command.name]!.timer);
    //       this.cooldowns.get(id)![command.name] = null;

    //       if (!Object.keys(this.cooldowns.get(id)!).length) {
    //         this.cooldowns.delete(id);
    //       }
    //     }, command.cooldown),
    //     end: endTime,
    //     uses: 0
    //   };
    // }

    // const entry = this.cooldowns.get(id)![command.name]!;

    // if (entry.uses >= 3) {
    //   const end = this.cooldowns.get(message.author.id)![command.name]!.end;
    //   const diff = end - message.createdTimestamp;

    //   this.emit("commandBlocked", message, command, "cooldown", diff);
    //   return true;
    // }

    // entry.uses++;

    // if (!developers.includes(message.author.id))
      // command.currentCooldowns.set(message.author.id, Date.now());

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

  public loadEvents(): boolean | void {
    const start = Date.now();
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
      this.bot.events.set(evt.name, evt);
    }
    this.logger.info("Loaded all Events.", `${Date.now() - start}ms`);
  }

  public loadCommands(): void | boolean {
    const start = Date.now();
    for (const file of Handler.walk(join(__dirname, "../..", "commands"))) {
      try {
        const cmdClass = (_ => _.default || _.Cmd || _)(require(file));
        const cmd: Command = new cmdClass(this.bot);

        cmd._onLoad(this);
        this.bot.commands.set(cmd.name, cmd);
      } catch (e) {
        this.logger.error(e, basename(file));
      }
    }
    this.logger.info("Loaded all Commands.", `${Date.now() - start}ms`);
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