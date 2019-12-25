import { Event, VorteMessage, Command } from "../../lib";
import ms = require("ms");

export default class CommandBlocked extends Event {
	public constructor() {
		super("command-blocked", {
			category: "Handler",
			event: "commandBlocked",
			emitter: "handler"
		});
	}

	public async run(message: VorteMessage, _c: Command, reason: string, cooldown: number) {
		switch (reason) {
			case "dev":
				message.sem("This command can only be used by developers :p");
				break;
			case "guild":
				message.sem("Sorry my guy, this command can only be used in guilds :(");
				break;
			case "dm":
				message.sem("Woah... this command can only be used in dms??!?!? weird fucking developers.");
				break;
			case "cooldown":
				message.sem(`Sorry, you have ${ms(Date.now() - cooldown)} left on your cooldown :(`, { type: "error" });
				break;
		}
	}
}