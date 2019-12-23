import { Message } from "discord.js";
import ms from "ms";
import { VorteEmbed, VortePlayer } from "../../structures";
import { Command } from "../../structures/Command";


export default class extends Command {
  public constructor() {
    super("play", {
      category: "Music",
      cooldown: 2000
    })
  }

  public async run(message: Message, args: string[]) {
    const { reply, channel, guild, member } = message;
    if (!args[0]) return reply("No query to search for provided!");
    if (!member!.voice) return reply("You need to be in a VoiceChannel this command!");
    if (guild!.me!.voice && guild!.me!.voice.channel && guild!.me!.voice.channelID !== member!.voice.channelID) return reply("You need to be in the same VoiceChannel as me to use this command!");

    let player = this.bot.andesite!.players!.get(guild!.id);
    if (!player) player = <VortePlayer> this.bot.andesite.nodes.ideal.first()!.join({
      channelId: message.member!.voice.channelID!,
      guildId: message.guild!.id
    });

    const { loadType, severity, cause, tracks } = await this.bot.andesite!.search(args.join(" "));
    if (!tracks && ["LOAD_FAILED", "NO_MATCHES"].includes(loadType)) return reply("Couldn't find that song!");

    const info = tracks![0].info;
    const musicEmbed = new VorteEmbed(message).baseEmbed()
      .setAuthor(`Added to the Queue.`, message.author.displayAvatarURL())
      .setDescription(`**[${info.title}](${info.uri})**\n*${ms(info.length)} long*`);

    channel.send(musicEmbed);
    if (!player!.playing) {
      await player!.play(tracks![0].track)
      player!.on("end", (data: object) => player!.ended.bind(player, data, message));
    };
  };
}