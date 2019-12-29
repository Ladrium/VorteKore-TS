import { Command, VorteEmbed, VorteMessage } from "../../lib";

const choices = ["rock", "paper", "scissors"];

export default class extends Command {
  public constructor() {
    super("rock-paper-scissors", {
      aliases: ["rps"],
      category: "Fun",
      cooldown: 500
    })
  }

  public async run(message: VorteMessage, [selected]: string[]) {
    if (!selected) return message.sem("Sooo... Playing Rock Paper Scissors against Air doesn't work?", { type: "error" });
    const botChoice = choices[Math.floor(Math.random() * choices.length)];
    if (botChoice == "rock") {
      if (selected.ignoreCase("rock")) message.sem(`I choose: ${botChoice}, It's a tie!`);
      else if (selected.ignoreCase("paper")) message.sem(`I choose: ${botChoice}, You won!`);
      else message.sem(`I choose ${botChoice}, I win!`)
    } else if (botChoice == "scissors") {
      if (selected.ignoreCase("rock")) message.sem(`I choose: ${botChoice}, You won!`);
      else if (selected.ignoreCase("scissors")) message.sem(`I choose: ${botChoice}, It's a tie!`);
      else message.sem(`I choose ${botChoice}, I win!`)
    } else if (botChoice == "paper") {
      if (selected.ignoreCase("scissors")) message.sem(`I choose: ${botChoice}, You won!`);
      else if (selected.ignoreCase("paper")) message.sem(`I choose: ${botChoice}, It's a tie!`);
      else message.sem(`I choose ${botChoice}, I win!`)
    }
  }
}