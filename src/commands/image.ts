import { Command } from "../structures/Command";
import { VorteClient } from "../structures/VorteClient";
import { Message } from "discord.js";
import fetch from "node-fetch";
import VorteEmbed from "../structures/VorteEmbed";
export class Cmd extends Command {
  constructor(bot: VorteClient) {
    super(bot, {
      name: "image",
      category: "Information",
      cooldown: 5000
    })
  }
  async run(message: Message, args: string[]) {
    const image = args[0];
    if (!image) return message.channel.send(new VorteEmbed(message).baseEmbed().setDescription("Please provide a query to search."))
    const url = "https://api.imgur.com/3/gallery/search?q=" + image;
    const file = await(await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": "CLIENT-ID f5f2386108961d7",
      },
    })).json();
    let num = Math.floor(Math.random() * file.data.length);
    if (file.data[num].images[0] == null || undefined) return message.channel.send(new VorteEmbed(message).baseEmbed().setDescription("Couldn't able to find image"));
    let link = file.data[num].images[0].link;1
    while (file.data[num].images[0].animated == true) {
      num = Math.floor(Math.random() * file.data.length);
      link = file.data[num].images[0].link;
    }
    const emb = new VorteEmbed(message).baseEmbed()
      .setColor("#000000")
      .setImage(link);
    message.channel.send(emb);
    }
  }