import { VoiceChannel } from "discord.js";
import { Collection } from "discord.js";
import { Event, Mute, VortePlayer } from "../../lib";
import DBLAPI = require("dblapi.js");

export default class extends Event {
	public constructor() {
		super("bot-ready", {
			category: "client",
			event: "ready"
		});
	}

	async run(bot = this.bot) {
		await bot.logger.info(`${bot.user!.username} is ready to rumble!`);
		bot.andesite.init(bot.user!.id);
		bot.user!.setPresence({
			activity: {
				name: "VorteKore | !help",
				type: "STREAMING",
				url: "https://api.chaosphoe.xyz/rick"
			},
			
		});
		if (process.env.NODE_ENV!.ignoreCase("production")) {
			bot.dbl = new DBLAPI(process.env.DBL_TOKEN!, {
				statsInterval: 900000,
				webhookAuth: process.env.DBL_WEBHOOK_AUTH,
				webhookPath: process.env.DBL_WEBHOOK_PATH,
				webhookPort: 3001
			}, this);
		}

		setInterval(async () => {
			const mutes = await Mute.getAll();
			mutes.forEach(async (x: any) => {
				if (x.time <= Date.now()) {
					try {
						const guild = bot.guilds.get(x.guildID);
						if (!guild) return Mute.deleteOne(x.guildID, x.userID);

						const member = guild.members.get(x.userID) || await guild.members.fetch(x.userID) || null;
						if (!member) return Mute.deleteOne(x.guildID, x.userID);

						const muteRole = guild.roles.find((x) => x.name.toLowerCase() === "muted");
						member.roles.remove(muteRole!).catch(null);
						return Mute.deleteOne(x.guildID, x.userID);
					} catch (error) {

					}
				}
			});

			const players = <Collection<string, VortePlayer>>bot.andesite.players;
			for (const [, player] of players) {
				const channel = bot.channels.get(player.channelId)! as VoiceChannel
				if (!channel || !(channel.members.filter(m => !m.user.bot).size))
					return player.queue.emit("last_man_standing");
			}
		}, 5000);
	};
}