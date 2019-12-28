import { Command, VortePlayer } from "../../lib";
import { VorteMessage } from "../../lib/classes/Message";
import { parse } from "url";

export default class extends Command {
  public constructor() {
    super("play", {
      category: "Music",
      cooldown: 2000,
      usage: "<query>",
      description: "Plays a song in your voide channel.",
      channel: "guild"
    })
  }

  public async run(message: VorteMessage, [ ...query ]: string[]) {
    let player = message.player
    
    if (!player && !message.member!.voice.channel) return message.sem("Please join a voice channel.", { type: "error" });
    if (player && !player.in(message.member!)) return message.sem("Please join the voice channel I'm in.", { type: "error" });
    if (player && player.radio) return message.sem("Sorry, the player is currently in radio mode :p", { type: "error" });
    if (!query.length) return message.sem("No query to search for provided!", { type: "error" });

    if (!player) player = <VortePlayer> this.bot.andesite.nodes.ideal.first()!.join<VortePlayer>({
      channelId: message.member!.voice.channelID!,
      guildId: message.guild!.id
    }).useMessage(message);

    let search = query.join(" ")
		if (!['http:', 'https:'].includes(parse(search).protocol!)) search = `ytsearch:${query}`;

    let res = await this.bot.andesite.search(search, player.node), msg;
    if (['TRACK_LOADED', 'SEARCH_RESULT'].includes(res.loadType)) {
      await player.queue.add([ res.tracks![0] ], message.author.id);
      msg = `[${res.tracks![0].info.title}](${res.tracks![0].info.uri})`;
    } else if (res.loadType === 'PLAYLIST_LOADED') {
      await player.queue.add(res.tracks!, message.author.id);
      msg = res.playlistInfo!.name;
    } else return message.sem("Sorry, I couldn't find what you were looking for.", { type: "error" });

    if (!player.playing && !player.paused) await player.queue.start();
    return message.sem(`Queued up **${msg}** :)`, { type: "music" });
  };
}