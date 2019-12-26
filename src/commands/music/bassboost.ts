import { developers } from "../../config";
import { Command, VorteMessage, VortePlayer } from "../../lib";

export default class extends Command {
  public constructor() {
    super("bassboost", {
      aliases: ["bb"],
			category: "Music",
			userPermissions(message: VorteMessage) {
        if (!message.member!.roles.some((role) => role.name.toLowerCase() === "dj") || !developers.includes(message.author.id))
          return "DJ";
        return;
      },
      cooldown: 5000,
			channel: "guild",
			description: "Manages the bassboost for the guild.",
			example: "!bassboost medium",
      usage: "<high|medium|low|none>"
    });
  }
  
  public async run(message: VorteMessage, [level]: [string]) {
    const player = <VortePlayer> this.bot.andesite!.players.get(message.guild!.id)!;

    if (!player) return message.sem("The bot isn't in a voice channel.", { type: "error" });
		if (!player.in(message.member!)) return message.sem("Please join the voice channel I'm in.", { type: "error" });
		if (!level) return message.sem(`The current bassboost level is **${player.bass}**.`);

		let levels: {[key:string]:number} = {
			high: 0.20,
			medium: 0.10,
			low: 0.05,
			none: 0
		}, i = 0

		if (levels[level.toLowerCase()] === undefined)
			return message.sem("The avaliable levels are **high**, **medium**, **low**, and **none**.");

		await player.filter("equalizer", {
			bands: Array(3).fill(null).map(() => ({ band: i++, gain: levels[level.toLowerCase()] }))
		});
		return message.sem(`Set the bassboost to **${level.toLowerCase()}**.`);
  }
}