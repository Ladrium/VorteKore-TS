"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../../lib");
class default_1 extends lib_1.Command {
    constructor() {
        super("feedback", {
            aliases: ["thoughts"],
            description: "Provide feedback on the bot!",
            usage: "<thoughts>",
            example: "!feedback fix stuff; or !feedback amazing music quality!",
            category: "Utility"
        });
    }
    async run(message, args) {
        if (!args.length)
            return message.sem("You should actually put something the next time ;)");
        const Feedback = new lib_1.VorteEmbed(message).baseEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setDescription(args.join(" "))
            .addField("\u200b", `**Sent From**: ${message.guild ? message.guild.name : "DMs"}`);
        await this.bot.channels.get("631151085150797833").send(Feedback);
        return message.sem("Feedback sent! Thanks <3");
    }
}
exports.default = default_1;
