import { Command, VorteMessage } from "../../lib";

export default class extends Command {
	public constructor() {
		super("prefix", {
			description: "Manages the guild prefix.",
			usage: "[prefix]",
			channel: "guild",
			userPermissions: [ "MANAGE_GUILD" ],
			category: "Settings",
			disabled: true
		})
	}

	public async run(message: VorteMessage, [prefix]: string[]) {}
}