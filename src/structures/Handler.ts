import { Message } from "discord.js";
import { readdirSync, statSync } from "fs";
import { join } from "path";
import { Command } from "./Command";
import { VorteClient } from "./VorteClient";
import { VorteEmbed } from "./VorteEmbed";
import { VorteGuild } from "./VorteGuild";
import { VorteMember } from "./VorteMember";
import { EventEmitter } from "events";
import { Event } from "./Event";

const cooldowns = new Set();

export class Handler {
  constructor(
    public bot: VorteClient
  ) {
    this.loadEvents = this.loadEvents.bind(this);
    this.loadCommands = this.loadCommands.bind(this);
  }
  async runCommand(message: Message, member: VorteMember) {
    if (message.author.bot || !message.guild) return;
    if (!message.member) Object.defineProperty(message, "member", await message.guild.members.fetch(message.author));

    const guild = new VorteGuild(message.guild!);
    const args = message.content.slice(guild.prefix.length).trim().split(/ +/g);
    const cmd = args.shift();
    const command = this.bot.commands.get(cmd!) || this.bot.commands.get(this.bot.aliases.get(cmd!)!) || null;

    if (!message.content.startsWith(guild.prefix)) return;
    if (command) {
      if (cooldowns.has(message.author.id)) return message.reply("Sorry you still have a cooldown! Please wait");
      cooldowns.add(message.author.id);
      try {
        await command.run(message, args, guild, member)
      } catch (e) {
        console.log(e);
        message.channel.send(new VorteEmbed(message)
          .errorEmbed(process.argv.includes("debug") ? e : undefined)
          .setDescription("Sorry, I ran into an error."))
      };

      setTimeout(() => {
        cooldowns.delete(message.author.id);
      }, command.cooldown);
    };
  }
  loadEvents = (): boolean | void => {
    console.log("----------------------------------------------");
    for (const file of Handler.walk(join(__dirname, "..", "events"))) {
      const evtClass = (_ => _.default || _.Evt || _)(require(file));
      const evt = new evtClass();

      evt._onLoad(this);
      const emitters: {
        [key: string]: EventEmitter
      } = { client: this.bot, process, andesite: this.bot.andesite };

      ((typeof evt.emitter === "function" && evt.emitter instanceof EventEmitter)
        ? evt.emitter
        : emitters[evt.emitter])[evt.type](evt.event, evt.run.bind(evt));

      console.log(`\u001b[32m[EVT ✅ ]\u001b[0m => Successfully loaded \u001b[34m${evt.category}\u001b[0m:${evt.name}`);
    }
    console.log("\u001b[32m[EVT ✅ ]\u001b[0m => Loaded all Events!");
  }

  loadCommands = (): void | boolean => {
    console.log("----------------------------------------------");
    for (const file of Handler.walk(join(__dirname, "..", "commands"))) {
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
    console.log("\u001b[32m[CMD ✅ ]\u001b[0m => Loaded all commands!");
  }
  getCommand(name: string): Command | undefined {
    return this.bot.commands.get(name) || this.bot.commands.get(this.bot.aliases.get(name)!) || undefined;
  }
  getCat(name: string) {
    return this.bot.commands.filter((command) => command.category === name);
  }
  getAllCommands() {
    return {
      commands: this.bot.commands.map((x) => x),
      size: this.bot.commands.size
    }
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