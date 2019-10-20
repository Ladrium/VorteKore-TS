"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
class default_1 {
    constructor(message) {
        this.message = message;
    }
    baseEmbed() {
        return new discord_js_1.MessageEmbed()
            .setAuthor(this.message.author.username, this.message.author.displayAvatarURL())
            .setFooter(this.message.client.user.username, this.message.client.user.displayAvatarURL())
            .setColor("#f54b02");
    }
    ErrorEmbed(error) {
        return this.baseEmbed()
            .setTitle("ERROR")
            .addField("Sorry a problem occured", error)
            .setColor("#ff0000");
    }
}
exports.default = default_1;
