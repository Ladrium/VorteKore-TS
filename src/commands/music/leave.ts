import { developers } from "../../config";
import { Command, VorteMessage } from "../../lib";

export default class extends Command {
  public constructor() {
    super("leave", {
      aliases: ["stop"],
      category: "Music",
      userPermissions(message: VorteMessage) {
        if (developers.includes(message.author.id) || message.member!.hasPermission("ADMINISTRATOR"))
          return;
        else if (message._guild!.djRole && message.member!.roles.some(r => r.id !== message._guild!.djRole))
          return "DJ";
        return;
      },
      channel: "guild"
    });
  }

  public async run(message: VorteMessage) {
    if (!message.player) return message.sem("The bot isn't in a voice channel.", { type: "error" });
    if (!message.player.in(message.member!)) return message.sem("Please join the voice channel I'm in.", { type: "error" });

    await message.player.stop();
    await message.player.node.leave(message.player.guildId);
    return message.sem("Successfully left the voice channel.", { type: "music" });
  }
}