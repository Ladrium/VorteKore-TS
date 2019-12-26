"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Module_1 = require("./Module");
class Command extends Module_1.VorteModule {
    constructor(name, options) {
        super(name, options);
        this.currentCooldowns = new Map();
        this.userPermissions = [];
        this.botPermissions = [];
        const { aliases = [], cooldown = 2000, description = "", example = "", usage = "", botPermissions = this.botPermissions, userPermissions = this.userPermissions, devOnly = false, channel, permsCheckAdmin = true } = options;
        this.botPermissions = typeof botPermissions === "function" ? botPermissions.bind(this) : botPermissions;
        this.userPermissions = typeof userPermissions === "function" ? userPermissions.bind(this) : userPermissions;
        this.aliases = aliases;
        this.permsCheckAdmin = permsCheckAdmin;
        this.usage = usage;
        this.description = description;
        this.example = example;
        this.cooldown = cooldown;
        this.devOnly = devOnly;
        this.channel = channel;
    }
}
exports.Command = Command;
