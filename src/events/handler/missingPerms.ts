import { Event, VorteMessage, Command } from "../../lib";

export default class CommandBlocked extends Event {
	public constructor() {
		super("missingPermissions", {
			category: "Handler",
			event: "missingPermissions",
			emitter: "handler"
		});
	}

	public async run(message: VorteMessage, _c: Command, missing: string | string[], botOrMember: string) {
		switch (botOrMember) {
			case "bot":
				message.sem([
					`Sorry, I need to following permissions for me to process your request :(`,
					Array.isArray(missing) ? missing.map((p, i) => `**${i++}**. ${p}}`) : `**1**. ${missing}`
				].join("\n"));
				break;
			case "member":
				message.sem([
					`Sorry, you need the following permissions to run this command`,
					Array.isArray(missing) ? missing.map((p, i) => `**${++i}**. ${p}`) : `**1**. ${missing}`
				].join("\n"));
				break;
		}
	}
}