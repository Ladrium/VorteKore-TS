"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const lib_1 = require("../../lib");
class default_1 extends lib_1.Event {
    constructor() {
        super("guild-deleted", {
            category: "guild",
            event: "guildDelete"
        });
    }
    async run(guild) {
        await this.bot.database.guilds.findOneAndDelete({ where: { guildId: guild.id } });
        const logs = await this.bot.channels.fetch("613827877015650304");
        return logs.send(new discord_js_1.MessageEmbed({ thumbnail: guild.iconURL() ? { url: guild.iconURL() } : {} })
            .setColor("red")
            .setTitle("Oh no :(")
            .setDescription(`I have left a guild called "${guild.name}" :( \n\nWe now have ${this.bot.guilds.size.toLocaleString}`));
    }
    ;
}
exports.default = default_1;
