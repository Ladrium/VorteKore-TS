import { Command, VorteMessage, VortePlayer } from "../../lib";

export default class extends Command {
	public constructor() {
		super("repeat", {
			category: "Music",
			cooldown: 2000,
			example: "!repeat queue; !repeat song",
			description: "Repeats the queue or song.",
			channel: "guild"
		});
	}

	public async run(message: VorteMessage, [_]: [string]) {
		const player = <VortePlayer>this.bot.andesite!.players.get(message.guild!.id)!;

		if (!player) return message.sem("The bot isn't in a voice channel.", { type: "error" });
		if (!player.in(message.member!)) return message.sem("You should join the voice channel I'm in... buckaroo", { type: "error" });
		if (player.radio) return message.sem("Sorry, the player is currently in radio mode :p", { type: "error" });
		if (!player.track) return message.sem("The bot isn't playing anything...", { type: "music" });

		switch (_) {
			case "song":
			case "track":
			default:
				const track = player.queue.repeat.song = !player.queue.repeat.song;
				message.sem(`${track ? "Enabled" : "Disabled"} song repeat for the player.`, { type: "music" });
				break;
				
			case "queue":
				const queue = player.queue.repeat.queue = !player.queue.repeat.queue;
				message.sem(`${queue ? "Enabled" : "Disabled"} queue repeat for the player.`, { type: "music" });
				break;
		}
	}
}