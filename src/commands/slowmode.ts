import { Command } from "../structures/Command";
import { VorteClient } from "../structures/VorteClient";
import { Message, GuildChannel } from "discord.js";
import VorteEmbed from "../structures/VorteEmbed";

export class Cmd extends Command {
  constructor(bot: VorteClient) {
    super(bot, {
      name: "slowmode",
      category: "Moderation",
      cooldown: 5000
    })
  }
  run(message: Message, args: string[]) {
    const chan = message.channel as GuildChannel;
    if (!args[0]) return new VorteEmbed(message).baseEmbed().setDescription("Please provide a valid number");
    if (args[0].toLowerCase() === "remove" || "release" || "rel") {
      message.channel.send("Succesffully removed the slowmode")
     return chan.edit({
        rateLimitPerUser: 0
     });
    };
    const sec = parseInt(args[0]);
    const reason = args.slice(1).join(" ") || "No reason provided";
    chan.edit({
      rateLimitPerUser: sec
    });
    if (reason) {
      message.channel.send(`This channel is in slowmode due to: ${reason}`);
    }
  }
};