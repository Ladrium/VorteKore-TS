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
    run(message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            return message.sem("Sorry, this command is in development :(", { type: "error" });
        });
    }
}
exports.Command = Command;
