import { Command } from "../structures/Command";
import { VorteClient } from "../structures/VorteClient";
import { Message, MessageEmbed } from "discord.js";
import fetch from "node-fetch";
import VorteEmbed from "../structures/VorteEmbed";

export class Cmd extends Command {
  constructor(bot: VorteClient) {
    super(bot, {
      name: "meme",
      category: "Fun",
      cooldown: 3000
    })
  }
  async run(message: Message) {
    const { image } = await fetch("api.chaosphoe.xyz/meme").then(res => res.json());

    const memeEmbed = new VorteEmbed(message)
      .baseEmbed()
      .setImage(image);
    message.channel.send(memeEmbed);
  }
}