import { Command, VorteMessage, VortePlayer } from "../../lib";

export default class extends Command {
	public constructor() {
		super("repeat", {
			category: "Music",
			example: "!repeat queue; !repeat song",
			description: "Repeats the queue or song.",
			channel: "guild"
		});
	}

	public async run(message: VorteMessage, [_]: [string]) {
		const player = <VortePlayer>this.bot.andesite!.players.get(message.guild!.id)!;

		if (!player) return message.sem("The bot isn't in a voice channel.");
		if (!player.in(message.member!)) return message.sem("You should join the voice channel I'm in... buckaroo");
		if (!player.track) return message.sem("The bot is playing anything...");

		switch (_) {
			case "song":
			case "track":
			default:
				const track = player.queue.repeat.song = !player.queue.repeat.song;
				message.sem(`${track ? "Enabled" : "Disabled"} song repeat for the player.`);
				break;
				
			case "queue":
				const queue = player.queue.repeat.queue = !player.queue.repeat.queue;
				message.sem(`${queue ? "Enabled" : "Disabled"} queue repeat for the player.`);
				break;
		}
	}
}