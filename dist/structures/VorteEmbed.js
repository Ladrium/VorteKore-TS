"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
class default_1 {
    baseEmbed(message) {
        return new discord_js_1.MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL())
            .setFooter(message.client.user.username, message.client.user.displayAvatarURL())
            .setColor("#f54b02");
    }
    ErrorEmbed(message, error) {
        return this.baseEmbed(message)
            .setTitle("ERROR")
            .addField("Sorry a problem occured", error)
            .setColor("#ff0000");
    }
}
exports.default = default_1;
