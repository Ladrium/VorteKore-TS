import { Command, VorteMessage, VortePlayer } from "../../lib";

export default class extends Command {
  public constructor() {
    super("resume", {
      category: "Music",
      description: "Resumes the player if not already paused.",
      channel: "guild"
    });
  }

  public async run(message: VorteMessage) {    
    if (!message.player) return message.sem("The bot isn't in a voice channel.", { type: "error" });
    if (!message.player.in(message.member!)) return message.sem("Please join my voice channel.", { type: "error" })
    if (!message.player.paused) return message.sem(`I'm not paused... :p`, { type: "music" });

    await message.player.resume();
    message.player.paused = false;
    return message.sem(`Successfully resumed the player!`);
  }
}