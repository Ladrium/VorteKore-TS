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
    const player = <VortePlayer> this.bot.andesite!.players.get(message.guild!.id)!;

    if (!player) return message.sem("The bot isn't in a voice channel.");
    if (!player.in(message.member!)) return message.sem("Please join the voice channel I'm in.", { type: "error" });
    if (player.paused) return message.sem(`I'm already paused... :p`);

    await player.pause();
    return message.sem(`Successfully paused the player!`);
  }
}