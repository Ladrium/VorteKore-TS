"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const lib_1 = require("../../lib");
class default_1 extends lib_1.Event {
    constructor() {
        super("guild-created", {
            category: "guild",
            event: "guildCreate"
        });
    }
    async run(guild) {
        const entry = await this.bot.database.getGuild(guild.id);
        const logs = await this.bot.channels.fetch("613827877015650304");
        return logs.send(new discord_js_1.MessageEmbed({ thumbnail: guild.iconURL() ? { url: guild.iconURL() } : {} })
            .setColor("GREEN")
            .setTitle("New Guild!")
            .setDescription(`I have joined a new guild called "${guild.name}", they have ${guild.members.filter(g => !g.user.bot).size} members!\n\nWe now have ${this.bot.guilds.size.toLocaleString()}`));
    }
    ;
}
exports.default = default_1;
