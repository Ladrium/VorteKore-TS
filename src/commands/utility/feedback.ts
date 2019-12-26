import { Command, VorteMessage, VorteEmbed } from "../../lib";
import { TextChannel } from "discord.js";

export default class extends Command {
	public constructor() {
		super("feedback", {
			aliases: ["thoughts"],
			description: "Provide feedback on the bot!",
			usage: "<thoughts>",
			example: "!feedback fix stuff; or !feedback amazing music quality!",
			category: "Utility"
		});
	}

	public async run(message: VorteMessage, args: string[]) {
		if (!args.length) return message.sem("You should actually put something the next time ;)");
		const Feedback = new VorteEmbed(message).baseEmbed()
			.setAuthor(message.author.tag, message.author.displayAvatarURL())
			.setDescription(args.join(" "))
			.addField("\u200b", `**Sent From**: ${message.guild ? message.guild.name : "DMs"}`);
		await (<TextChannel>this.bot.channels.get("631151085150797833")!).send(Feedback);
		return message.sem("Feedback sent! Thanks <3");
	}
}