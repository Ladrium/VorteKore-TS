import Collection from "@discordjs/collection";
import { GuildChannel } from "discord.js";
import { EventEmitter } from "events";
import { readdirSync, statSync } from "fs";
import { join, basename } from "path";
import { developers } from "../../config";
import { VorteGuild } from "../database/VorteGuild";
import { VorteMember } from "../database/VorteMember";
import { VorteClient } from "../VorteClient";
import { Command } from "./Command";
import { VorteMessage } from "./Message";
import { VorteEmbed } from "./VorteEmbed";
import Logger from "@ayana/logger";

export class Handler extends EventEmitter {
  public logger: Logger = Logger.get(Handler);
  constructor(
    public bot: VorteClient
  ) {
    super();
  }

  async runCommand(message: VorteMessage, member?: VorteMember) {
    if (message.author.bot) return;
    if (message.guild && !message.member)
      Object.defineProperty(message, "member", { value: await message.guild.members.fetch(message.author) });
    const guild = await message.getGuild();
    let prefix = message.guild ? guild!.prefix : "!";
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
        cmd.aliases.forEach((alias: string) => this.bot.aliases.set(alias, cmd.name));
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