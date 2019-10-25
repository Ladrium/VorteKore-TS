import { Command } from "../structures/Command";
import { VorteClient } from "../structures/VorteClient";
import { Message } from "discord.js";
import fetch from "node-fetch";

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
  }
}