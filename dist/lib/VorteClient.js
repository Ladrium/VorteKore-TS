"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("@ayana/logger"));
const discord_js_1 = require("discord.js");
const discord_js_andesite_1 = require("discord.js-andesite");
const path_1 = require("path");
const _1 = require(".");
const config_1 = require("../config");
const ClientUtil_1 = __importDefault(require("../util/ClientUtil"));
const Config_1 = require("../util/Config");
const Handler_1 = require("./classes/Handler");
class VorteClient extends discord_js_1.Client {
    constructor() {
        super();
        this.logger = logger_1.default.get(VorteClient);
        this.plugins = new discord_js_1.Collection();
        this.commands = new discord_js_1.Collection();
        this.events = new discord_js_1.Collection();
        this.util = new ClientUtil_1.default(this);
        this.handler = new Handler_1.Handler(this);
        this.andesite = new discord_js_andesite_1.Manager(this, {
            nodes: config_1.nodes,
            player: _1.VortePlayer,
            restTimeout: 20000
        });
        this.prefix = (message) => {
            if (!message.guild)
                return Config_1.Config.get("node_env", false) === "development" ? "b!" : "!";
            const guild = message._guild;
            return guild.prefixes;
        };
        this._loadPlugins();
    }
    async _loadPlugins() {
        try {
            const start = Date.now();
            for (const file of Handler_1.Handler.walk(path_1.join(__dirname, "../", "plugins"))) {
                try {
                    const mod = (require(file));
                    if (mod.default === undefined)
                        return;
                    const plugin = new (mod.default)(this);
                    await plugin.onLoad();
                    this.plugins.set(plugin.name, plugin);
                    Object.defineProperty(this, plugin.name, { value: plugin });
                }
                catch (error) {
                    this.logger.info(error);
                }
            }
            this.logger.info("Loaded all plugins.", `${Date.now() - start}ms`);
        }
        catch (error) {
            this.logger.error(error);
        }
    }
}
exports.VorteClient = VorteClient;
