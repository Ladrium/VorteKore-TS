"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Command {
    constructor(bot, data) {
        this.bot = bot;
        this.name = data.name;
        this.aliases = data.aliases || [];
        this.category = data.category || "Main";
        this.usage = data.usage || this.name;
        this.description = data.description;
        this.example = data.example;
        this.cooldown = data.cooldown || 0;
    }
    run(message, args, guild, member) {
        console.log("This command isnt added yet!");
    }
}
exports.Command = Command;
