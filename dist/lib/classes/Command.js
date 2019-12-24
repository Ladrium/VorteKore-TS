"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Module_1 = require("./Module");
class Command extends Module_1.VorteModule {
    constructor(name, options) {
        super(name, options);
        this.currentCooldowns = new Map();
        this.userPermissions = [];
        this.botPermissions = [];
        const { aliases = [], category = "Main", cooldown = 0, description = "", disabled, example = "", usage = "", botPermissions = this.botPermissions, userPermissions = this.userPermissions } = options;
        this.botPermissions = typeof botPermissions === "function" ? botPermissions.bind(this) : botPermissions;
        this.userPermissions = typeof userPermissions === "function" ? userPermissions.bind(this) : userPermissions;
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
