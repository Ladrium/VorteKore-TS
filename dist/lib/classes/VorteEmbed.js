"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
class VorteEmbed {
    constructor(message) {
        this.message = message;
    }
    baseEmbed() {
        return new discord_js_1.MessageEmbed()
            .setAuthor(this.message.author.username, this.message.author.displayAvatarURL())
            .setFooter(`VorteKore | ChaosPhoe`)
            .setColor("#4b62fa");
    }
    errorEmbed(error) {
        const embed = this.baseEmbed()
            .setAuthor("Oops!", this.message.author.displayAvatarURL())
            .setColor("#ff4255");
        if (error)
            embed.setDescription(`Sorry, I ran into an error!\n\`\`\`js\n${error}\`\`\``);
        return embed;
    }
}
exports.VorteEmbed = VorteEmbed;
