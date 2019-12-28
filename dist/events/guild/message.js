"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../../lib");
class default_1 extends lib_1.Event {
    constructor() {
        super("message-received", {
            category: "guild",
            event: "message"
        });
        this.coins = (max, min) => Math.floor(Math.random() * max) + min;
        this.xp = (max, min) => Math.floor(Math.random() * max) + min;
        this.recently = new Set();
    }
    async run(message) {
        if (message.author.bot || !this.bot.database.ready)
            return;
        await message.init();
        if (message.guild) {
            if (!this.recently.has(message.author.id)) {
                if (Math.random() > 0.50) {
                    message.profile.add("coins", this.coins(50, 5));
                    if (Math.random() > 0.60) {
                        message.profile.add("xp", this.xp(25, 2));
                        if (message.profile.xp > 2 * (75 * message.profile.level)) {
                            message.profile.add("level", 1);
                            try {
                                if (message._guild && !message._guild.levelUpMsg)
                                    message.sem(`Congrats 🎉! You're now level ${message.profile.level}`);
                            }
                            catch (e) { }
                        }
                    }
                    message.profile.save();
                    this.recently.add(message.author.id);
                    setTimeout(() => this.recently.delete(message.author.id), 25000);
                }
            }
        }
        return this.handler.runCommand(message);
    }
    ;
}
exports.default = default_1;
