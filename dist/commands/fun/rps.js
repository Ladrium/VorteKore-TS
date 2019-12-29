"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../../lib");
const choices = ["rock", "paper", "scissors"];
class default_1 extends lib_1.Command {
    constructor() {
        super("rock-paper-scissors", {
            aliases: ["rps"],
            category: "Fun",
            cooldown: 500
        });
    }
    async run(message, [selected]) {
        if (!selected)
            return message.sem("Sooo... Playing Rock Paper Scissors against Air doesn't work?", { type: "error" });
        const botChoice = choices[Math.floor(Math.random() * choices.length)];
        if (botChoice == "rock") {
            if (selected.ignoreCase("rock"))
                message.sem(`I choose: ${botChoice}, It's a tie!`);
            else if (selected.ignoreCase("paper"))
                message.sem(`I choose: ${botChoice}, You won!`);
            else
                message.sem(`I choose ${botChoice}, I win!`);
        }
        else if (botChoice == "scissors") {
            if (selected.ignoreCase("rock"))
                message.sem(`I choose: ${botChoice}, You won!`);
            else if (selected.ignoreCase("scissors"))
                message.sem(`I choose: ${botChoice}, It's a tie!`);
            else
                message.sem(`I choose ${botChoice}, I win!`);
        }
        else if (botChoice == "paper") {
            if (selected.ignoreCase("scissors"))
                message.sem(`I choose: ${botChoice}, You won!`);
            else if (selected.ignoreCase("paper"))
                message.sem(`I choose: ${botChoice}, It's a tie!`);
            else
                message.sem(`I choose ${botChoice}, I win!`);
        }
    }
}
exports.default = default_1;
