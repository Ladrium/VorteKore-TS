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
const events_1 = require("events");
const fs_1 = require("fs");
const path_1 = require("path");
const config_1 = require("../../config");
const VorteGuild_1 = require("../database/VorteGuild");
const VorteEmbed_1 = require("./VorteEmbed");
const ms = require("ms");
class Handler extends events_1.EventEmitter {
    constructor(bot) {
        super();
        this.bot = bot;
        this.loadEvents = () => {
            const start = Date.now();
            console.log("----------------------------------------------");
            for (const file of Handler.walk(path_1.join(__dirname, "../..", "events"))) {
                const evtClass = (_ => _.default || _.Evt || _)(require(file));
                const evt = new evtClass();
                evt._onLoad(this);
                const emitters = { client: this.bot, process, andesite: this.bot.andesite, handler: this };
                ((typeof evt.emitter === "function" && evt.emitter instanceof events_1.EventEmitter)
                    ? evt.emitter
                    : emitters[evt.emitter])[evt.type](evt.event, evt.run.bind(evt));
                console.log(`\u001b[32m[EVT ✅ ]\u001b[0m => Successfully loaded \u001b[34m${evt.category}\u001b[0m:${evt.name}`);
            }
            console.log(`\u001b[32m[EVT ✅ ]\u001b[0m => Loaded all Events in ${ms(Date.now() - start)}!`);
        };
        this.loadCommands = () => {
            const start = Date.now();
            console.log("----------------------------------------------");
            for (const file of Handler.walk(path_1.join(__dirname, "../..", "commands"))) {
                try {
                    const cmdClass = (_ => _.default || _.Cmd || _)(require(file));
                    const cmd = new cmdClass(this.bot);
                    cmd._onLoad(this);
                    this.bot.commands.set(cmd.name, cmd);
                    cmd.aliases.forEach((alias) => this.bot.aliases.set(alias, cmd.name));
                    console.log(`\u001b[32m[CMD ✅ ]\u001b[0m => Successfully loaded \u001b[34m${cmd.category}\u001b[0m:${cmd.name}`);
                }
                catch (e) {
                    console.log(`\u001b[31m[CMD ❌ ]\u001b[0m => ${file} has an error: ${e.toString()}`);
                }
            }
            console.log(`\u001b[32m[CMD ✅ ]\u001b[0m => Loaded all commands in ${ms(Date.now() - start)}!`);
        };
        this.loadEvents = this.loadEvents.bind(this);
        this.loadCommands = this.loadCommands.bind(this);
    }
    runCommand(message, member) {
        return __awaiter(this, void 0, void 0, function* () {
            if (message.author.bot)
                return;
            if (message.guild && !message.member)
                Object.defineProperty(message, "member", { value: yield message.guild.members.fetch(message.author) });
            let prefix = message.guild ? new VorteGuild_1.VorteGuild(message.guild).prefix : "!";
            if (!message.content.startsWith(prefix))
                return;
            const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/g);
            const command = this.bot.commands.find(c => c.name.ignoreCase(cmd) || c.aliases.includes(cmd.toLowerCase()));
            if (!command || !(yield this.runChecks(message, command)))
                return;
            try {
                yield command.run(message, args);
            }
            catch (e) {
                console.log(e);
                message.channel.send(new VorteEmbed_1.VorteEmbed(message)
                    .errorEmbed(process.execArgv.includes("--debug") ? e : undefined)
                    .setDescription("Sorry, I ran into an error."));
            }
            ;
            setTimeout(() => {
                command.currentCooldowns.delete(message.author.id);
            }, command.cooldown);
        });
    }
    runChecks(message, command) {
        return __awaiter(this, void 0, void 0, function* () {
            const cooldown = command.currentCooldowns.get(message.author.id);
            if (cooldown) {
                this.emit("commandBlocked", message, command, "cooldown", cooldown);
                return false;
            }
            if (!config_1.developers.includes(message.author.id))
                command.currentCooldowns.set(message.author.id, Date.now());
            if (command.devOnly && !config_1.developers.includes(message.author.id)) {
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
                    let botPerms = yield command.botPermissions(message);
                    if (botPerms != null) {
                        this.emit("missingPermissions", message, command, botPerms, "bot");
                        return false;
                    }
                }
                else if (message.guild) {
                    const botPerms = message.channel.permissionsFor(this.bot.user).missing(command.botPermissions);
                    if (botPerms.length) {
                        this.emit("missingPermissions", message, command, botPerms, "bot");
                        return false;
                    }
                }
            }
            if (command.userPermissions) {
                if (typeof command.userPermissions === "function") {
                    let botPerms = yield command.userPermissions(message);
                    if (botPerms != null && !config_1.developers.includes(message.author.id)) {
                        this.emit("missingPermissions", message, command, botPerms, "member");
                        return false;
                    }
                }
                else if (message.guild) {
                    const botPerms = message.channel.permissionsFor(message.author).missing(command.userPermissions);
                    if (botPerms.length && !config_1.developers.includes(message.author.id)) {
                        this.emit("missingPermissions", message, command, botPerms, "member");
                        return false;
                    }
                }
            }
            return true;
        });
    }
    get cateories() {
        return [...new Set(this.bot.commands.map(c => c.category))];
    }
    getCommand(name) {
        return this.bot.commands.find((command) => command.name.ignoreCase(name)
            || command.aliases.some(a => a.ignoreCase(name)));
    }
    getCategory(name) {
        return this.bot.commands.filter((command) => command.category.ignoreCase(name));
    }
    static walk(directory) {
        const result = [];
        (function read(dir) {
            const files = fs_1.readdirSync(dir);
            for (const file of files) {
                const filepath = path_1.join(dir, file);
                if (fs_1.statSync(filepath).isDirectory())
                    read(filepath);
                else
                    result.push(filepath);
            }
        }(directory));
        return result;
    }
}
exports.Handler = Handler;
;
