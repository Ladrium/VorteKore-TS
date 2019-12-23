import { Message } from "discord.js";
import { VorteEmbed } from "../../structures";
import { Command } from "../../structures/Command";

export default class extends Command {
  public constructor() {
    super("leave", {
      aliases: ["stop"],
      category: "Music",
      cooldown: 0
    });
  }
  
  public async run(message: Message, query: string[]) {
    const player = this.bot.andesite!.players.get(message.guild!.id)!;

    if (!player) return message.reply(" Bot is not playing music");

    await player.stop();
    return message.channel.send(new VorteEmbed(message).baseEmbed().setDescription("Successfully left the channel"));
  }
}