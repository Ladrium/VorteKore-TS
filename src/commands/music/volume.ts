import { Command, VorteClient, VorteEmbed, VorteMessage, VortePlayer } from "../../lib";
import { Message } from "discord.js";
import { checkDJ, checkPermissions } from "../../util";

export default class extends Command {
  public constructor() {
    super("volume", {
      aliases: ["vol"],
      category: "Music",
      cooldown: 0,
      userPermissions(message: VorteMessage) {
        if (!message.member!.roles.some((role) => role.name.toLowerCase() === "dj"))
          return "DJ";
        return;
      }
    });
  }
  
  public async run(message: VorteMessage, [volume]: any) {
    const player = <VortePlayer> this.bot.andesite!.players.get(message.guild!.id)!;
    if (!player) return message.sem("The bot isn't in a voice channel.");
    if (!player.in(message.member!)) return message.sem("Please join my voice channel.")

    if (isNaN(volume) || volume.includes("-") || volume.includes(".") || volume > 100 || volume < 1) return message.reply("Please return a valid number between 1-100");
    volume = parseInt(volume);
    await player.setVolume(volume);
    message.channel.send(`Set the Volume to: \`${volume}\``)
  }
}