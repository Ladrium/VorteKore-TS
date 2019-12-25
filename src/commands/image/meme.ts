import { VorteEmbed, VorteMessage } from "../../lib";
import { Command } from "../../lib/classes/Command";
import { get } from "../../util";

export default class extends Command {
  public constructor() {
    super("meme", {
      category: "Image",
      aliases: ["joke"],
      cooldown: 3000,
      description: "Provides a meme",
      example: "!meme"
    });
  }

  public async run(message: VorteMessage) {
    const { data, error } = await get<{ image: string }>("https://api.chaosphoe.xyz/meme");
    if (!data) {
      console.error(error);
      return message.sem(`Sorry, we ran into an error :(`, { type: "error" });
    }

    const memeEmbed = new VorteEmbed(message)
      .baseEmbed()
      .setAuthor(message.author.username, message.author.displayAvatarURL())
      .setImage(data.image);
    return message.channel.send(memeEmbed);
  }
}