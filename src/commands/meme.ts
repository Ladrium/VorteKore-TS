import { Command } from "../structures/Command";
import { VorteClient, VorteEmbed } from "../structures";
import { Message, MessageEmbed } from "discord.js";
import fetch from "node-fetch";

export class Cmd extends Command {
  constructor(bot: VorteClient) {
    super(bot, {
      name: "meme",
      category: "Fun",
      aliases: ["joke"],
      cooldown: 3000,
      description: "Provides a meme",
      example: "!meme"
    })
  }
  async run(message: Message) {
    const { image } = await fetch("https://api.chaosphoe.xyz/meme").then(res => res.json());
    const memeEmbed = new VorteEmbed(message)
      .baseEmbed()
      .setImage(image);
    message.channel.send(memeEmbed);
  }
}