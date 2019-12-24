import { Message } from "discord.js";
import { Command } from "../../lib/classes/Command";
import { checkDJ, checkPermissions } from "../../util";
import { VorteMessage, VortePlayer } from "../../lib";
import message from "../../events/guild/message";

export default class extends Command {
  public constructor() {
    super("skip", {
      category: "Music",
      cooldown: 0,
      userPermissions(message: VorteMessage) {
        if (!message.member!.roles.some((role) => role.name.toLowerCase() === "dj"))
          return "DJ";
        return;
      }
    })
  }

  public async run(message: VorteMessage, query: string[]) {
    const player = <VortePlayer> this.bot.andesite!.players.get(message.guild!.id)!;
    
    if (!player) return message.sem("The bot isn't in a voice channel.");
    if (!player.in(message.member!)) return message.sem("Please join my voice channel.")

    await player.emit("end", {});
  }
}                                                         