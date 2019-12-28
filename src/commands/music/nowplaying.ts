import { Command, VorteEmbed, VorteMessage, VortePlayer } from "../../lib";
import { playerEmbed } from "../../util";

export default class extends Command {
  public constructor() {
    super("nowplaying", {
      aliases: ["np"],
      description: "Sends the current playing song.",
      category: "Music",
      channel: "guild"
    });
  }
  
  public async run(message: VorteMessage) {
    if (!message.player) return message.sem("The bot isn't in a voice channel.", { type: "error" });
    if (message.player.radio) {
      const stationEmbed = new VorteEmbed(message).musicEmbed()
        .setAuthor("VorteKore 420.69 FM", message.author.displayAvatarURL())
        .setDescription([
          `**Station**: ${message.player.radio.name}`,
          `**Country**: ${message.player.radio.country}`,
          `**Clicks**: ${message.player.radio.clickcount.toLocaleString()}`,
          `**Homepage**: ${message.player.radio.homepage}`
        ].join("\n"))
      if (message.player.radio.favicon) stationEmbed.setThumbnail(message.player.radio.favicon)
      return message.channel.send(stationEmbed);
    };
    if (!message.player.queue.np.song) return message.sem(`Sorry, there is nothing playing :p`, { type: "error" });

    const { info } = message.player.queue.np.song!,
      playingEmbed = new VorteEmbed(message).musicEmbed()
      .setAuthor("Now Playing", message.author.displayAvatarURL())
      .setDescription(`**Song Name**: [${info.title}](${info.uri})\n**Author**: ${info.author}`)
      .addField("\u200B", playerEmbed(message.player, message.player.queue.np.song!));
    return message.channel.send(playingEmbed);
  }
}