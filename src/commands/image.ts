import { Command } from "../structures/Command";
import { VorteClient } from "../structures/VorteClient";
import { Message, TextChannel } from "discord.js";
import fetch from "node-fetch";
import VorteEmbed from "../structures/VorteEmbed";
export class Cmd extends Command {
  constructor(bot: VorteClient) {
    super(bot, {
      name: "image",
      category: "Information",
      cooldown: 5000,
      description: "Provides you image with provided name",
      example: "!image cow"
    })
  }
  async run(message: Message, [...image]: string[]) {
    if (!image[0]) return message.channel.send(new VorteEmbed(message).baseEmbed().setDescription("Please provide a query to search."))
    let link: any = `https://imgur.com/r/${image.join(" ")}/hot.json`;
    const { data } = await fetch(link).then(res => res.json());
    link = data[Math.floor(Math.random() * data.length)];
    if ((message.channel as TextChannel).nsfw && link.nsfw) return message.reply("Sorry this result was NSFW");
    link = `https://i.imgur.com/${link.hash}${link.ext}`;
    while (!link) {
      data[Math.floor(Math.random() * data.length)];
    }
    const emb = new VorteEmbed(message).baseEmbed()
      .setColor("#000000")
      .setImage(link)
    if (link.title) emb.setTitle(link.title)
    message.channel.send(emb);
  }
}