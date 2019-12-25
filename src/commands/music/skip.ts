import { VorteMessage, VortePlayer } from "../../lib";
import { Command } from "../../lib/classes/Command";
import { developers } from "../../config";

export default class extends Command {
  public constructor() {
    super("skip", {
      category: "Music",
      userPermissions(message: VorteMessage) {
        if (!message.member!.roles.some((role) => role.name.toLowerCase() === "dj") || !developers.includes(message.author.id))
          return "DJ";
        return;
      },
      channel: "guild"
    })
  }

  public async run(message: VorteMessage, query: string[]) {
    const player = <VortePlayer> this.bot.andesite!.players.get(message.guild!.id)!;
    
    if (!player) return message.sem("The bot isn't in a voice channel.");
    if (!player.in(message.member!)) return message.sem("Please join my voice channel.")

    await player.emit("end", {});
  }
}                                                         