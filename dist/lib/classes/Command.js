"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Module_1 = require("./Module");
const logger_1 = __importDefault(require("@ayana/logger"));
class Command extends Module_1.VorteModule {
    constructor(name, options) {
        super(name, options);
        this.currentCooldowns = new Map();
        this.logger = Command.logger;
        this.userPermissions = [];
        this.botPermissions = [];
        const { aliases = [], cooldown = 2000, description = "", example = "", usage = "", botPermissions = this.botPermissions, userPermissions = this.userPermissions, devOnly = false, channel, permsCheckAdmin = true, disabledMessage } = options;
        this.botPermissions = typeof botPermissions === "function" ? botPermissions.bind(this) : botPermissions;
        this.userPermissions = typeof userPermissions === "function" ? userPermissions.bind(this) : userPermissions;
        this.disabledMessage = disabledMessage;
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
Command.logger = logger_1.default.get(Command);
