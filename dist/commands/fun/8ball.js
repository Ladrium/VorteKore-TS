"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../../lib");
const answers = ["You may rely on it.", "Yes – definitely.", "Yes.", "Without a doubt.",
    "Very doubtful.", "Signs point to yes.", "Reply hazy, try again.", "Outlook good.",
    "Outlook not so good.", "My sources say no.", "My reply is no.", "Most likely.",
    "It is decidedly so.", "It is certain.", "Don’t count on it.", "Concentrate and ask again.",
    "Cannot predict now.", "Better not tell you now.", "Ask again later.", "As I see it, yes."];
class default_1 extends lib_1.Command {
    constructor() {
        super("8ball", {
            category: "Economy",
            cooldown: 500
        });
    }
    async run(message, [selected]) {
        if (!selected)
            return message.sem("Sooo... There is no question?", { type: "error" });
        message.sem(`${answers[Math.floor(Math.random() * answers.length)]}`);
    }
}
exports.default = default_1;
