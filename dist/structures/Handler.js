"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const VorteGuild_1 = require("./VorteGuild");
const cooldowns = new Set();
class Handler {
    constructor(client) {
        this.loadEvents = () => {
            console.log("Loading Events...");
            const files = fs_1.readdirSync("./events");
            if (!files[0])
                return console.log("No events found!");
            for (const file of files) {
                if (!file.endsWith(".d.ts")) {
                    if (!file.endsWith(".js"))
                        return console.log(`[❌] => ${file} doesn't end with .js`);
                    const event = require(`${path_1.dirname(require.main.filename)}/events/${file}`);
                    const eventName = file.split(".")[0];
                    this.bot.on(eventName, event.bind(null, this.bot));
                    console.log(`[✅] => Successfully loaded event: ${file}`);
                }
            }
            console.log("Loaded all Events!");
        };
        this.loadCommands = () => {
            console.log("Loading Commands...");
            const files = fs_1.readdirSync("./commands");
            if (!files[0])
                return console.log("No commands found!");
            for (const file of files) {
                if (!file.endsWith(".d.ts")) {
                    if (!file.endsWith(".js"))
                        console.log(`[❌] => ${file} doesn't end with .js`);
                    let { Cmd } = require(`${path_1.dirname(require.main.filename)}/commands/${file}`);
                    try {
                        Cmd = new Cmd(this.bot);
                        this.bot.commands.set(Cmd.name, Cmd);
                    }
                    catch (e) {
                        console.log(`[❌] => ${file} has an error: ${e.toString()}`);
                    }
                    if (Cmd.aliases[0])
                        Cmd.aliases.forEach((alias) => this.bot.aliases.set(alias, Cmd.name));
                    console.log(`[✅] => Successfully loaded command: ${file}`);
                }
            }
            console.log("Loaded all commands!");
        };
        this.bot = client;
        this.loadEvents = this.loadEvents.bind(this);
        this.loadCommands = this.loadCommands.bind(this);
    }
    runCommand(message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (message.author.bot || !message.guild)
                return;
            if (!message.member)
                Object.defineProperty(message, "member", yield message.guild.members.fetch(message.author));
            const guild = new VorteGuild_1.VorteGuild(message.guild);
            const args = message.content.slice(guild.prefix.length).trim().split(/ +/g);
            const cmd = args.shift();
            const command = this.bot.commands.get(cmd) || this.bot.commands.get(this.bot.aliases.get(cmd)) || null;
            if (!message.content.startsWith(guild.prefix))
                return;
            if (command) {
                if (cooldowns.has(message.author.id))
                    return message.reply("Sorry you still have a cooldown! Please wait");
                cooldowns.add(message.author.id);
                command.run(message, args, guild);
                setTimeout(() => {
                    cooldowns.delete(message.author.id);
                }, command.cooldown);
            }
            ;
        });
    }
    getCommand(name) {
        return this.bot.commands.get(name) || this.bot.commands.get(this.bot.aliases.get(name)) || undefined;
    }
    getAllCommands() {
        return {
            commands: this.bot.commands.map((x) => x),
            size: this.bot.commands.size
        };
    }
}
exports.Handler = Handler;
;
