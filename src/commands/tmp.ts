import { Command } from "../structures/Command";
import { VorteClient } from "../structures/VorteClient";
import { Message } from "discord.js";
import VorteEmbed from "../structures/VorteEmbed";
import fetch from "node-fetch";

export class Cmd extends Command {
  constructor(bot: VorteClient) {
    super(bot, {
      name: "tmp",
      category: "Games",
      cooldown: 5000
    })
  }
 async run(message: Message, args: string[]) {
   const data = await (await fetch("https://api.truckersmp.com/v2/servers")).json();
   const emb = new VorteEmbed(message)
     .baseEmbed();
    data.response!.forEach((r: { name: string; shortname: string; players: number; maxplayers: number; }) => {
      emb.addField(r.name + `(${r.shortname})`, `Players: ${r.players}/${r.maxplayers}`, true)
    });
   message.channel.send(emb)
  } 
};