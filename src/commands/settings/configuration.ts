import { Command, VorteMessage } from "../../lib";

export default class extends Command {
	public constructor() {
		super("configuration", {
			description: "Shows the current guild configuration.",
			channel: "guild",
			userPermissions: [ "MANAGE_GUILD" ],
			category: "Settings",
			disabled: true
		})
	}

	public async run(message: VorteMessage, [prefix]: string[]) {}
}