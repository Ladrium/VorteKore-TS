import { Command, VorteMessage, VortePlayer } from "../../lib";
import { VoiceChannel } from "discord.js";
import { developers } from "../../config";

export default class extends Command {
  public constructor() {
    super("move", {
      aliases: ["move-vc", "movevc", "moveto"],
			category: "Music",
			userPermissions(message: VorteMessage) {
        if (!message.member!.roles.some((role) => role.name.toLowerCase() === "dj") || !developers.includes(message.author.id))
          return "DJ";
        return;
      },
      cooldown: 5000,
			channel: "guild",
			description: "Moves the bot to another voice channel.",
			example: "!move 613347362705768469",
			usage: "<voice channel id>"
    });
  }
  
  public async run(message: VorteMessage, [channel]: string[]) {
    const player = <VortePlayer> this.bot.andesite!.players.get(message.guild!.id)!;

    if (!player) return message.sem("The bot isn't in a voice channel.");
		if (!player.in(message.member!)) return message.sem("Please join the voice channel I'm in.", { type: "error" });
		if (!channel) return message.sem("Provide a voice channel to move to.", { type: "error" });

		const chan = message.guild!.channels.get(channel);
		if (!chan || !(chan instanceof VoiceChannel)) return message.sem("Please provide a valid voice channel id.");

		await player.moveVoiceChannel(chan.id);
		return message.sem(`Successfully moved to ${chan}!`);
  }
}