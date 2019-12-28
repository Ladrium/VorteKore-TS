import { developers } from "../../config";
import { Command, VorteMessage } from "../../lib";

export default class extends Command {
  public constructor() {
    super("bassboost", {
      aliases: ["bb"],
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
			description: "Manages the bassboost for the guild.",
			example: "!bassboost medium",
      usage: "<high|medium|low|none>"
    });
  }
  
  public async run(message: VorteMessage, [level]: ["high"|"medium"|"low"|"none"]) {
    if (!message.player) return message.sem("The bot isn't in a voice channel.", { type: "error" });
		if (!message.player.in(message.member!)) return message.sem("Please join the voice channel I'm in.", { type: "error" });
		if (!level) return message.sem(`The current bassboost level is **${message.player.bass.toLowerCase()}**.`);

		let levels: {[key:string]:number} = {
			high: 0.20,
			medium: 0.10,
			low: 0.05,
			none: 0
		}, i = 0

		if (levels[level.toLowerCase()] === undefined)
			return message.sem("The avaliable levels are **high**, **medium**, **low**, and **none**.");

		await message.player.filter("equalizer", {
			bands: Array(3).fill(null).map(() => ({ band: i++, gain: levels[level.toLowerCase()] }))
		});
		message.player.bass = level;
		return message.sem(`Set the bassboost to **${level.toLowerCase()}**.`);
  }
}