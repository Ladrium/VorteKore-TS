import { Command, VorteMessage } from "../../lib";

export default class extends Command {
	public constructor() {
		super("embedcolor", {
			description: "Manages this guilds embed color.",
			channel: "guild",
			userPermissions: [ "MANAGE_GUILD" ],
			category: "Settings",
			disabled: true
		});
	}

	public async run(message: VorteMessage, [prefix]: string[]) {}
}