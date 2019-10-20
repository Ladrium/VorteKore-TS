"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var path_1 = require("path");
var cooldowns = new Set();
var Handler = /** @class */ (function () {
    function Handler(client) {
        var _this = this;
        this.loadEvents = function () {
            console.log("Loading Events...");
            var files = fs_1.readdirSync("./events");
            if (!files[0])
                return console.log("No events found!");
            for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
                var file = files_1[_i];
                if (!file.endsWith(".d.ts")) {
                    if (!file.endsWith(".js"))
                        return console.log("[\u274C] => " + file + " doesn't end with .js");
                    var event_1 = require(path_1.dirname(require.main.filename) + "/events/" + file);
                    var eventName = file.split(".")[0];
                    _this.bot.on(eventName, event_1.bind(null, _this.bot));
                    console.log("[\u2705] => Successfully loaded event: " + file);
                }
            }
            console.log("Loaded all Events!");
        };
        this.loadCommands = function () {
            console.log("Loading Commands...");
            var files = fs_1.readdirSync("./commands");
            if (!files[0])
                return console.log("No commands found!");
            var _loop_1 = function (file) {
                if (!file.endsWith(".d.ts")) {
                    console.log(file);
                    if (!file.endsWith(".js"))
                        console.log("[\u274C] => " + file + " doesn't end with .js");
                    var Cmd_1 = require(path_1.dirname(require.main.filename) + "/commands/" + file);
                    try {
                        Cmd_1 = new Cmd_1(_this.bot);
                        _this.bot.commands.set(Cmd_1.name, Cmd_1);
                    }
                    catch (e) {
                        console.log("[\u274C] => " + file + " has an error");
                    }
                    if (Cmd_1.aliases[0])
                        Cmd_1.aliases.forEach(function (alias) { return _this.bot.aliases.set(alias, Cmd_1.name); });
                    console.log("[\u2705] => Successfully loaded command: " + file);
                }
            };
            for (var _i = 0, files_2 = files; _i < files_2.length; _i++) {
                var file = files_2[_i];
                _loop_1(file);
            }
            console.log("Loaded all commands!");
        };
        this.bot = client;
        this.loadEvents = this.loadEvents.bind(this);
        this.loadCommands = this.loadCommands.bind(this);
    }
    Handler.prototype.runCommand = function (message, prefix) {
        if (message.author.bot || !message.guild)
            return;
        var args = message.content.slice(prefix.length).trim().split(/ +/g);
        var cmd = args.shift();
        var command = this.bot.commands.get(cmd) || this.bot.commands.get(this.bot.aliases.get(cmd)) || null;
        if (command) {
            if (cooldowns.has(message.author.id))
                return message.reply("Sorry you still have a cooldown! Please wait");
            cooldowns.add(message.author.id);
            command.run(message, args);
            setTimeout(function () {
                cooldowns["delete"](message.author.id);
            }, command.cooldown);
        }
        ;
    };
    Handler.prototype.getCommand = function (name) {
        return this.bot.commands.get(name) || this.bot.commands.get(this.bot.aliases.get(name)) || null;
    };
    Handler.prototype.getAllCommands = function () {
        return {
            commands: this.bot.commands.map(function (x) { return x; }),
            size: this.bot.commands.size
        };
    };
    return Handler;
}());
exports.Handler = Handler;
;
