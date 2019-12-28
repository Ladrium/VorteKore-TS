"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("@ayana/logger"));
const collection_1 = __importDefault(require("@discordjs/collection"));
const events_1 = require("events");
const fs_1 = require("fs");
const path_1 = require("path");
const config_1 = require("../../config");
const VorteEmbed_1 = require("./VorteEmbed");
class Handler extends events_1.EventEmitter {
    constructor(bot) {
        super();
        this.bot = bot;
        this.cooldowns = new collection_1.default();
        this.logger = logger_1.default.get(Handler);
    }
    get mentionOnly() {
        return new RegExp(`^<@!?${this.bot.user.id}>$`);
    }
    get prefixMention() {
        return new RegExp(`^<@!?${this.bot.user.id}>`);
    }
    ;
    async runCommand(message) {
        if (message.author.bot)
            return;
        if (message.guild && !message.member)
            Object.defineProperty(message, "member", { value: await message.guild.members.fetch(message.author) });
        if (this.mentionOnly.test(message.content))
            return message.sem("Hello!");
        let prefix = await this.prefix(message);
        if (!message.content.startsWith(prefix))
            return;
        const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = this.bot.commands.find(c => c.name.ignoreCase(cmd) || c.aliases.includes(cmd.toLowerCase()));
        if (!command || !await this.runChecks(message, command))
            return;
        try {
            await command.run(message, args);
        }
        catch (e) {
            message.channel.send(new VorteEmbed_1.VorteEmbed(message)
                .errorEmbed(process.execArgv.includes("--debug") ? e : undefined)
                .setDescription("Sorry, I ran into an error."));
        }
        ;
        setTimeout(() => {
            command.currentCooldowns.delete(message.author.id);
        }, command.cooldown);
    }
    prefix(message) {
        let prefix = "";
        if (this.bot.prefix && typeof this.bot.prefix === "function") {
            let returned = this.bot.prefix(message);
            if (Array.isArray(returned))
                for (const _prefix of returned) {
                    if (message.content.startsWith(_prefix))
                        prefix = _prefix;
                }
            else if (typeof returned === "string") {
                if (message.content.startsWith(returned))
                    prefix = returned;
            }
            ;
        }
        else if (typeof this.bot.prefix === "string" && message.content.startsWith(this.bot.prefix))
            prefix = this.bot.prefix;
        if (!prefix) {
            if (message.content.match(this.prefixMention))
                prefix = message.content.match(this.prefixMention)[0];
        }
        return prefix;
    }
    async runChecks(message, command) {
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
                let botPerms = await command.botPermissions(message);
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
                let botPerms = await command.userPermissions(message);
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
    }
    loadEvents() {
        const start = Date.now();
        for (const file of Handler.walk(path_1.join(__dirname, "../..", "events"))) {
            const evtClass = (_ => _.default || _.Evt || _)(require(file));
            const evt = new evtClass();
            evt._onLoad(this);
            const emitters = { client: this.bot, process, andesite: this.bot.andesite, handler: this };
            ((typeof evt.emitter === "function" && evt.emitter instanceof events_1.EventEmitter)
                ? evt.emitter
                : emitters[evt.emitter])[evt.type](evt.event, evt.run.bind(evt));
            this.bot.events.set(evt.name, evt);
        }
        this.logger.info("Loaded all Events.", `${Date.now() - start}ms`);
    }
    loadCommands() {
        const start = Date.now();
        for (const file of Handler.walk(path_1.join(__dirname, "../..", "commands"))) {
            try {
                const cmdClass = (_ => _.default || _.Cmd || _)(require(file));
                const cmd = new cmdClass(this.bot);
                cmd._onLoad(this);
                this.bot.commands.set(cmd.name, cmd);
            }
            catch (e) {
                this.logger.error(e, path_1.basename(file));
            }
        }
        this.logger.info("Loaded all Commands.", `${Date.now() - start}ms`);
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
