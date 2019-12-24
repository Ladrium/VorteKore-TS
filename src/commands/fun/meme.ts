import { Command } from "../../lib/classes/Command";
import { VorteClient, VorteEmbed } from "../../lib";
import { Message, MessageEmbed } from "discord.js";
import fetch from "node-fetch";

export default class extends Command {
  public constructor() {
    super("meme", {
      category: "Fun",
      aliases: ["joke"],
      cooldown: 3000,
      description: "Provides a meme",
      example: "!meme"
    });
  }

  public async run(message: Message) {
    const { image } = await fetch("https://api.chaosphoe.xyz/meme").then(res => res.json());
    const memeEmbed = new VorteEmbed(message)
      .baseEmbed()
      .setImage(image);
    message.channel.send(memeEmbed);
  }
}