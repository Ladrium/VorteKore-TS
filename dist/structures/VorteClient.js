"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
class VorteClient extends discord_js_1.Client {
    constructor(options) {
        super(options);
        this.commands = new discord_js_1.Collection();
        this.aliases = new discord_js_1.Collection();
        this.on("ready", () => {
            console.log(`${this.user.username} is ready to rumble!`);
        });
    }
}
exports.VorteClient = VorteClient;
