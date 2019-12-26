import { VorteEmbed, VorteMessage } from "../../lib";
import { Command } from "../../lib/classes/Command";
import { get } from "../../util";

export default class extends Command {
  public constructor() {
    super("fox", {
      category: "Image",
      aliases: ["foxes"],
      cooldown: 3000,
      description: "Provides a fox pic from r/foxes",
      example: "!meme"
    });
  }

  public async run(message: VorteMessage) {
    const { data, error } = await get<RedditTopJSON.RootObject>("https://www.reddit.com/r/foxes.json");
    if (!data) {
      console.error(error);
      return message.sem(`Sorry, we ran into an error :(`, { type: "error" });
		}
		
		const images = data.data.children.filter((post) => post.data.post_hint === "image")
			, image = images[Math.floor(Math.random() * images.length)].data;
		return message.channel.send(new VorteEmbed(message).baseEmbed()
			.setAuthor(image.author)
			.setTitle(image.title).setURL(`https://reddit.com${image.permalink}`)
			.setImage(image.url)
			.setFooter(`👍 ${image.ups}`))
  }
}