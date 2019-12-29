import { Command, VorteEmbed, VorteMessage } from "../../lib";
import { createCanvas, loadImage } from "canvas";

export default class extends Command {
	public constructor() {
		super("profile", {
			aliases: ["profile", "me"],
			description: "Displays your profile in an embed.",
			channel: "guild",
			usage: "[action] <value>",
			example: "!profile set bio I'm cool!",
			category: "Economy"
		});
	}

	public async run(message: VorteMessage, args: string[]) {
		switch (args[0]) {
			case "set":
				switch (args[1]) {
					case "bio":
					case "biography":
						message.profile!.bio = args.slice(2).join(" ");
						message.sem("Successfully updated your bio.");
						await message.profile!.save();
						break;
					default:
						message.sem("The only setting avaliable is **bio**");
						break;
				}
				break;
			default:
				const { level, xp, bio, coins, warns } = message.profile!;
				/*c
				const canvas = createCanvas(500, 200);
				const ctx = canvas.getContext("2d");
				const xpNeed = 2 * (75 * level);
				const image = await loadImage("../../../images/rank-card.png");

				ctx.lineWidth = 15;
				ctx.font = "30px Impact";
				ctx.fillText(level.toString(), 5, 5);
				ctx.drawImage(image, 0, 0);
				*/
				message.channel.send(new VorteEmbed(message).baseEmbed()
					.setDescription(bio)
					.setThumbnail(message.author.displayAvatarURL())
					.addField("\u200b", [
						`**Level**: ${level}`,
						`**Exp**: ${Math.round(xp)}`,
						`**Coins**: ${Math.round(coins)}`,
						`**Warns**: ${warns}`
					].join("\n")));
				break;
		}
	}
}