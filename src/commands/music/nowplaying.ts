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
    const player = <VortePlayer> this.bot.andesite!.players.get(message.guild!.id)!;

    if (!player) return message.sem("The bot isn't in a voice channel.", { type: "error" });
    if (player.radio) {
      const stationEmbed = new VorteEmbed(message).musicEmbed()
        .setAuthor("VorteKore 420.69 FM", message.author.displayAvatarURL())
        .setDescription([
          `**Station**: ${player.radio.name}`,
          `**Country**: ${player.radio.country}`,
          `**Clicks**: ${player.radio.clickcount.toLocaleString()}`,
          `**Homepage**: ${player.radio.homepage}`
        ].join("\n"))
      if (player.radio.favicon) stationEmbed.setThumbnail(player.radio.favicon)
      return message.channel.send(stationEmbed);
    };
    if (!player.queue.np.song) return message.sem(`Sorry, there is nothing playing :p`, { type: "error" });

    const { info } = player.queue.np.song!,
      playingEmbed = new VorteEmbed(message).musicEmbed()
      .setAuthor("Now Playing", message.author.displayAvatarURL())
      .setDescription(`**Song Name**: [${info.title}](${info.uri})\n**Author**: ${info.author}`)
      .addField("\u200B", playerEmbed(player, player.queue.np.song!));
    return message.channel.send(playingEmbed);
  }
}