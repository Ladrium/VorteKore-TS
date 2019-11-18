import { Command } from "../structures/Command";
import { VorteClient } from "../structures/VorteClient";
import { Message } from "discord.js";
import VorteEmbed from "../structures/VorteEmbed";
import fetch from "node-fetch";
export class Cmd extends Command {
  constructor(bot: VorteClient) {
    super(bot, {
      name: "overwatch",
      category: "Games",
      cooldown: 5000,
      aliases: ["ow"]
    })
  }
  async run(message: Message, args: string[]) {
    if (!args[0] || !["pc", "xbox", "ps", "switch"].includes(args[0].toLowerCase())) return message.channel.send(new VorteEmbed(message).baseEmbed().setDescription("Please provide a valid platform:- `xbox`, `pc`, `ps`, `switch`"));
    if (!args[1] || !["us", "eu", "asia"].includes(args[1].toLowerCase())) return message.channel.send(new VorteEmbed(message).baseEmbed().setDescription("Please provide a valid platform:- `us`, `asia`,`eu`"));
    if (!args[2]) return message.channel.send("Please provide a tag.");
    const tag = args[2].replace("#", "-");



    const link = `https://ow-api.com/v1/stats/${args[0].toLowerCase()}/${args[1].toLowerCase()}/${tag}com`
    const { icon, name, level, endorsement, rating, gamesWon, quickPlayStats, competitiveStats } = await (await fetch(link)).json();
    const emb = new VorteEmbed(message)
      .baseEmbed()
      .setThumbnail(icon)
      .setDescription(
       `**>** Name: ${name}
        **>** Level: ${level},
        **>** Endorsement Level: ${endorsement}.
        **>** Rating: ${rating},
        **>** Games Won: ${gamesWon},`
      )
      .addField(`Quick Play Stats`,
        `**>** Games Won: ${quickPlayStats.games.won}`)
      .addField(`**>** Competitive Stats`,
       `**>** Games Won: ${competitiveStats.games.won}/${competitiveStats.games.played}
        **>** Gold Medal: ${competitiveStats.awards.medalsGold}`)
   message.channel.send(emb) 

  }
};