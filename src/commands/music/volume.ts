import { developers } from "../../config";
import { Command, VorteMessage, VortePlayer } from "../../lib";

export default class extends Command {
  public constructor() {
    super("volume", {
      aliases: ["vol"],
      category: "Music",
      userPermissions(message: VorteMessage) {
        if (developers.includes(message.author.id) || message.member!.hasPermission("ADMINISTRATOR"))
          return;
        else if (message._guild!.djRole && message.member!.roles.some(r => r.id !== message._guild!.djRole))
          return "DJ";
        return;
      },
      channel: "guild",
      cooldown: 5000
    });
  }
  
  public async run(message: VorteMessage, [val]: string[]) {
    const player = <VortePlayer> this.bot.andesite!.players.get(message.guild!.id)!;

    if (!player) return message.sem("The bot isn't in a voice channel.", { type: "error" });
    if (!player.in(message.member!)) return message.sem("Please join my voice channel.", { type: "error" })

    const volume = Number(val);
    if (isNaN(volume) || ["-", "."].some(s => val.includes(s)) || volume > 100 || volume < 1) return message.sem("Please return a valid number between 1-100", { type: "error" });

    await player.setVolume(volume);
    return message.sem(`Set the Volume to: \`${volume}\``, { type: "music" });
  }
}