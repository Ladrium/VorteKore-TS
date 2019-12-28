import { VoiceChannel } from "discord.js";
import { developers } from "../../config";
import { Command, VorteMessage } from "../../lib";

export default class extends Command {
  public constructor() {
    super("move", {
      aliases: ["move-vc", "movevc", "moveto"],
			category: "Music",
			userPermissions(message: VorteMessage) {
        if (developers.includes(message.author.id) || message.member!.hasPermission("ADMINISTRATOR"))
          return;
        else if (message._guild!.djRole && message.member!.roles.some(r => r.id !== message._guild!.djRole))
          return "DJ";
        return;
      },
      cooldown: 5000,
			channel: "guild",
			description: "Moves the bot to another voice channel.",
			example: "!move 613347362705768469",
      usage: "<voice channel id>",
      disabled: true
    });
  }
  
  public async run(message: VorteMessage, [channel]: string[]) {
    if (!message.player) return message.sem("The bot isn't in a voice channel.", { type: "error" });
		if (!message.player.in(message.member!)) return message.sem("Please join the voice channel I'm in.", { type: "error" });
		if (!channel) return message.sem("Provide a voice channel to move to.", { type: "error" });

		const chan = message.guild!.channels.get(channel);
		if (!chan || !(chan instanceof VoiceChannel)) return message.sem("Please provide a valid voice channel id.", { type: "error" });

		await message.player.moveVoiceChannel(chan.id);
		return message.sem(`Successfully moved to ${chan}!`, { type: "music" });
  }
}