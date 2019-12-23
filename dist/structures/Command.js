"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Module_1 = require("./Module");
class Command extends Module_1.VorteModule {
    constructor(name, { aliases = [], category = "Main", cooldown = 0, description = "", disabled, example = "", usage = "" }) {
        super(name, { disabled, category });
        this.aliases = aliases;
        this.category = category;
        this.usage = usage;
        this.description = description;
        this.example = example;
        this.cooldown = cooldown;
    }
    run(message, args, guild, member) {
        console.log("This command isnt added yet!");
    }
}
exports.Command = Command;
