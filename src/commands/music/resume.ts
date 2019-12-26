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
    const player = <VortePlayer> this.bot.andesite!.players.get(message.guild!.id)!;
    
    if (!player) return message.sem("The bot isn't in a voice channel.", { type: "error" });
    if (!player.in(message.member!)) return message.sem("Please join my voice channel.", { type: "error" })
    if (!player.paused) return message.sem(`I'm not paused... :p`, { type: "music" });

    await player.resume();
    return message.sem(`Successfully resumed the player!`);
  }
}