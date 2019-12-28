import { Command, VorteMessage, VortePlayer } from "../../lib";

export default class extends Command {
  public constructor() {
    super("pause", {
      category: "Music",
      cooldown: 5000,
      description: "Pauses the player if not already resumed.",
      channel: "guild"
    });
  }

  public async run(message: VorteMessage) {
    if (!message.player) return message.sem("The bot isn't in a voice channel.", { type: "error" });
    if (!message.player.in(message.member!)) return message.sem("Please join the voice channel I'm in.", { type: "error" });
    if (message.player.paused) return message.sem(`I'm already paused... :p`, { type: "music" });

    await message.player.pause();
    message.player.paused = true;
    return message.sem(`Successfully paused the player!`, { type: "music" });
  }
}