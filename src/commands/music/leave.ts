import { Command, VorteMessage, VortePlayer } from "../../lib";
import { developers } from "../../config";

export default class extends Command {
  public constructor() {
    super("leave", {
      aliases: ["stop"],
      category: "Music",
      userPermissions(message: VorteMessage) {
        if (!message.member!.roles.some((role) => role.name.toLowerCase() === "dj") || !developers.includes(message.author.id))
          return "DJ";
        return;
      },
      channel: "guild"
    });
  }

  public async run(message: VorteMessage) {
    const player = <VortePlayer>this.bot.andesite!.players.get(message.guild!.id)!;

    if (!player) return message.sem("The bot isn't in a voice channel.", { type: "error" });
    if (!player.in(message.member!)) return message.sem("Please join the voice channel I'm in.", { type: "error" });

    await player.stop();
    await player.node.leave(player.guildId);
    return message.sem("Successfully left the voice channel.", { type: "music" });
  }
}