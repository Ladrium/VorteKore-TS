import { Command } from "../structures/Command";
import { VorteClient } from "../structures/VorteClient";
import { Message } from "discord.js";

export class Cmd extends Command {
  constructor(bot: VorteClient) {
    super(bot, {
      name: "play",
      category: "Music",
      cooldown: 0
    })
  }
  async run({ guild, member, reply, channel }: Message, query: string[]) {
    if (!query[0]) return reply("No query to search for provided!");
    if (!member!.voice) return reply("You need to be in a VoiceChannel this command!");
    if (guild!.me!.voice && guild!.me!.voice.channel && guild!.me!.voice.channelID !== member!.voice.channelID) return reply("You need to be in the same VoiceChannel as me to use this command!");

    let player = this.bot.player!.lavalink!.get(guild!.id);
    if (!player) player = await this.bot.player!.lavalink!.join({
      guild: guild!.id,
      channel: member!.voice.channelID!,
      host: this.bot.player!.lavalink!.nodes.first()!.host
    }, { selfdeaf: true });

    const { data, error } = await this.bot.player!.getSongs(query.join(" "));
    if (error || !data) return reply("Couldn't find that song!");
    const queue = this.bot.player!.queue.getQueue(guild!) || new this.bot.player!.queue(guild!)._init();
    queue.addSong(data);
    channel.send(`Successfully added \`${data.tracks[0].info.title}\` to the queue!`);
    if (!player!.playing) {
      player!.play(data.tracks[0].track)
        .on("end", (data: object) => {
          this.bot.emit("songEnd", data, player, queue, { guild, channel });
        });
    }
  };
}