import { developers } from "../../config";
import { VorteMessage } from "../../lib";
import { Command } from "../../lib/classes/Command";

export default class extends Command {
  public constructor() {
    super("shuffle", {
      category: "Music",
      userPermissions(message: VorteMessage) {
        if (developers.includes(message.author.id) || message.member!.hasPermission("ADMINISTRATOR"))
          return;
        else if (message._guild!.djRole && message.member!.roles.some(r => r.id !== message._guild!.djRole))
          return "DJ";
        return;
      },
      channel: "guild"
    })
  }

  public async run(message: VorteMessage) {
    if (!message.player) return message.sem("The bot isn't in a voice channel.", { type: "error" });
    if (!message.player.in(message.member!)) return message.sem("Please join my voice channel.", { type: "error" })
    if (message.player.radio) return message.sem("Sorry, the player is currently in radio mode :p", { type: "error" });
    if (!message.player.queue.np) return message.sem("Nothing is playing", { type: "error" });
    
    await message.player.queue.shuffle();
    return message.sem("Shuffled the Queue!", { type: "music" });
  }
}                                                         