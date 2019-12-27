import { Command, VorteMessage, VortePlayer } from "../../lib";
import { get } from "../../util";

export default class extends Command {
	public constructor() {
		super("radio", {
			aliases: ["radio-station"],
			description: "Plays a radio station into your voice channel.",
			usage: "<tags>",
			example: "!radio lofi hiphop",
			channel: "guild",
			category: "Music"
		});
	}

	public async run(message: VorteMessage, [...tags]: [string]) {
		const player = <VortePlayer> this.bot.andesite!.players.get(message.guild!.id)!;

    if (!player) return message.sem("The bot isn't in a voice channel.", { type: "error" });
		if (!player.in(message.member!)) return message.sem("Please join the voice channel I'm in.", { type: "error" });

		// if (tags[0].ignoreCase("stop") && player.radio) {
		// 	await player.stop();	
		// 	delete player.radio;
		// 	return message.sem("Stopped the radio!");
		// }

		const fetched = await get<RadioBrowser.RootObject[]>(`https://fr1.api.radio-browser.info/json/stations/bytag/${tags.join(",")}`);
		if (!fetched.data || !fetched.data.length) {
			console.error("radio command", fetched.error);
			return message.sem("Sorry, I couldn't find any stations with those tags");
		}

		let avaliableStations = fetched.data.filter(station => Boolean(station.lastcheckok) && station.codec.ignoreCase("mp3"))
		if (!avaliableStations.length)
			return message.sem("Sorry, I couldn't find any supported stations :(((", { type: "error" });
		avaliableStations = avaliableStations.slice(0, 10);

		let stations = `Please pick a radio station.\n`;
		avaliableStations.forEach((station, index) => {
			stations += `**${index+1}.** [${station.countrycode}] ${station.name} [${station.tags.split(",").slice(0, 5).join(", ")}]\n`;
		});

		const choice = await message.sem(stations);
		try {
			const collected = await choice.channel.awaitMessages(
				(m: VorteMessage) => {
					if (m.author.id !== message.author.id) return false;
					else if(m.content.ignoreCase("cancel") || Number(m.content) > avaliableStations.length || Number(m.content) < 1) return false;
					else return true;
				},
				{
					max: 1,
					errors: ["time"],
					time: 20000
				}
			);

			if (!collected.size || !collected.first())
				return message.sem("C'mon man... I just needed a number 1 through 10 *sobs*");

			if (collected.first()!.content.ignoreCase("cancel"))
				return message.sem("Cancelled radio streaming...");

			const station = avaliableStations[Number(collected.first()!.content) - 1];
			if (!station) return message.sem("HMMM, i think I broke, fuck... contact my developers :((((((", { type: "error" });

			const search = await this.bot.andesite.search(station.url_resolved, player.node);
			if (["NO_MATCHES", "LOAD_FAILED"].includes(search.loadType))
				return message.sem("Sorry, I guess we couldn't play this one :(", { type: "error" });

			player.radio = station;
			await player.play(search.tracks![0].track);
			return message.sem(`***VorteKore 420.69 FM*** [${station.name}](${station.homepage})\n*you won't get updates when a new song plays*`, { type: "music" });
		} catch(e) {
			return message.sem("Sorry buckaroo you ran out of time :p", { type: "error" });
		}
	} 
}