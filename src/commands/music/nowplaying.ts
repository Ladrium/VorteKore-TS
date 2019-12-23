import { Command, VorteClient, VorteEmbed, Queue } from "../../structures";
import { Message } from "discord.js";
import { formatTime } from "../../util";

export default class extends Command {
  public constructor() {
    super("nowplaying", {
      aliases: ["np"],
      category: "Music",
      cooldown: 0
    });
  }
  
  public async run(message: Message) {
    if (!message.guild!.me!.voice) return message.reply("I'm not playing anything!");
    if (!message.member!.voice || message.member!.voice.channelID !== message.guild!.me!.voice.channelID)
      return message.reply("You need to be in the same voice channel as the bot!");

    const player = this.bot!.andesite!.players!.get(message.guild!.id);
    if (!player || !player.playing) return message.reply("Not playing anything right now!");

    const queue = this.bot.queues.get(message.guild!.id)!;
    if (!queue.next.length) return message.reply("Nothing queued right now!");

    const song = queue.next[0];
    const info = song.info;
    const pos = Math.round(player.position / info.length) * 10;
    const pos2 = Math.round(15 - pos);
    const currTime = formatTime(player.position);
    const fullTime = formatTime(info.length);

    let str = `${"▬".repeat(pos)}🔘${"▬".repeat(pos2)}`
    const playingEmbed = new VorteEmbed(message).baseEmbed()
      .setTitle("Now Playing")
      .addField("Song Name", `[${info.title}](${info.uri})`)
      .addField("Author", info.author)
      .addField("Position", `${str} \n\`${currTime.m}:${currTime.s} / ${fullTime.m}:${fullTime.s}\``);
    message.channel.send(playingEmbed);
  }
}