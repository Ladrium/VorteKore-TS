"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("@ayana/logger"));
const discord_js_1 = require("discord.js");
const discord_js_andesite_1 = require("discord.js-andesite");
const _1 = require(".");
const config_1 = require("../config");
const Handler_1 = require("./classes/Handler");
class VorteClient extends discord_js_1.Client {
    constructor() {
        super(...arguments);
        this.logger = logger_1.default.get(VorteClient);
        this.commands = new discord_js_1.Collection();
        this.aliases = new discord_js_1.Collection();
        this.handler = new Handler_1.Handler(this);
        this.andesite = new discord_js_andesite_1.Manager(this, {
            nodes: config_1.nodes,
            player: _1.VortePlayer,
            restTimeout: 20000
        });
        this.queues = new discord_js_1.Collection();
    }
}
exports.VorteClient = VorteClient;
