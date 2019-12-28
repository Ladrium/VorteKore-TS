import { Command, VorteMessage } from "../../lib";

export default class extends Command {
	public constructor() {
		super("logs", {
			description: "Manages the guild logs.",
			usage: "[channel]",
			channel: "guild",
			userPermissions: [ "MANAGE_GUILD" ],
			category: "Settings",
			disabled: true
		});
	}

	public async run(message: VorteMessage, [prefix]: string[]) {}
}