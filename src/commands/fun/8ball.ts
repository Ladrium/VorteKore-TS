import { Command, VorteEmbed, VorteMessage } from "../../lib";

const answers = ["You may rely on it.", "Yes – definitely.", "Yes.", "Without a doubt.",
  "Very doubtful.", "Signs point to yes.", "Reply hazy, try again.", "Outlook good.",
  "Outlook not so good.", "My sources say no.", "My reply is no.", "Most likely.",
  "It is decidedly so.", "It is certain.", "Don’t count on it.", "Concentrate and ask again.",
  "Cannot predict now.", "Better not tell you now.", "Ask again later.", "As I see it, yes."]

export default class extends Command {
  public constructor() {
    super("8ball", {
      category: "fun",
      cooldown: 500
    })
  }

  public async run(message: VorteMessage, [selected]: any) {
    if (!selected) return message.sem("Sooo... There is no question?", { type: "error" });
    message.sem(`${answers[Math.floor(Math.random() * answers.length)]}`)
  }
}