import { Command, VorteMessage } from "../../lib";

export default class extends Command {
	public constructor() {
		super("welcomechannel", {
			description: "Manages the welcome channel.",
			usage: "[#channel|channelId]",
			channel: "guild",
			userPermissions: [ "MANAGE_GUILD" ],
			category: "Settings",
			disabled: true
		})
	}

	public async run(message: VorteMessage, [prefix]: string[]) {}
}