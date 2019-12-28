"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../../lib");
class default_1 extends lib_1.Command {
    constructor() {
        super("ping", {
            aliases: ["pong"],
            description: "Sends the bot & discord api ping.",
            category: "Information"
        });
    }
    async run(message) {
        const start = Date.now();
        return new Promise((resolve) => {
            this.bot["api"].channels[message.channel.id].typing.post()
                .then(() => {
                return resolve(message.sem([
                    `**Bot Ping**: ${Math.round(this.bot.ws.ping)}ms`,
                    `**API Ping**: ${Math.round(Date.now() - start)}ms`
                ].join("\n")));
            });
        });
    }
}
exports.default = default_1;
