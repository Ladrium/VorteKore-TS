import { Command, VorteClient, VorteEmbed, VorteQueue, VorteMessage, VortePlayer } from "../../lib";
import { Message } from "discord.js";
import { _formatTime, playerEmbed } from "../../util";

export default class extends Command {
  public constructor() {
    super("nowplaying", {
      aliases: ["np"],
      description: "Sends the current playing song.",
      category: "Music",
    });
  }
  
  public async run(message: VorteMessage) {
    const player = <VortePlayer> this.bot.andesite!.players.get(message.guild!.id)!;
    if (!player) return message.sem("The bot isn't in a voice channel.");
    if (!player.queue.np.song) return message.sem(`Sorry, there is nothing playing :p`, { type: "error" });

    const { info } = player.queue.np.song!,
      playingEmbed = new VorteEmbed(message).baseEmbed()
      .setAuthor("Now Playing", message.author.displayAvatarURL())
      .setDescription(`**Song Name**: [${info.title}](${info.uri})\n**Author**: ${info.author}`)
      .addField("\u200B", playerEmbed(player, player.queue.np.song!));
    return message.channel.send(playingEmbed);
  }
}