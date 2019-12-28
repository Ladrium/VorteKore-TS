import { Command } from "../../lib/classes/Command";
import { VorteMessage, VortePlayer } from "../../lib";

export default class extends Command {
  public constructor() {
    super("seek", {
      category: "Music",
      example: "!seek 5s",
      cooldown: 2000,
      channel: "guild"
    });
  }
  
  public async run(message: VorteMessage, [time]: string[]) {
    if (!message.player) return message.sem("The bot isn't in a voice channel.", { type: "error" });
    if (!message.player.in(message.member!)) return message.sem("Please join the voice channel I'm in.", { type: "error" });
    if (message.player.radio) return message.sem("Sorry, the player is currently in radio mode :p", { type: "error" });

    const match = time.match(/(.*)s/)!;
    if (!match || !match[1]) return message.sem("Please provide a time to skip in (provide it in seconds, Example: !seek 5s)", { type: "error" });

    let number = parseInt(match[1]);
    if (isNaN(number) || match[1].includes("-")) return message.sem("Provide a correct time to seek to (Example: !seek 5s)", { type: "error" });
    
    await message.player.seek(number * 1000);
    return message.sem(`Seeked to the request position!`, { type: "music" })
  }
}