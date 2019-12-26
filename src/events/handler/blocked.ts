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
				message.sem("This command can only be used by developers :p", { type: "error" });
				break;
			case "guild":
				message.sem("Sorry my guy, this command can only be used in guilds :(", { type: "error" });
				break;
			case "dm":
				message.sem("Woah... this command can only be used in dms??!?!? weird fucking developers.", { type: "error" });
				break;
			case "cooldown":
				message.sem(`Sorry, you have ${ms(Date.now() - cooldown)} left on your cooldown :(`, { type: "error" });
				break;
			case "disabled":
				message.sem("Oh no... this command is disabled, you should come back later.", { type: "error" });
		}
	}
}