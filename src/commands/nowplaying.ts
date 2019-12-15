import { Command, VorteClient, VorteEmbed } from "../structures";
import { Message } from "discord.js";

export class Cmd extends Command {
  constructor(bot: VorteClient) {
    super(bot, {
      name: "nowplaying",
      aliases: ["np"],
      category: "Music",
      cooldown: 0
    });
  }
  async run(message: Message) {
    if (!message.guild!.me!.voice) return message.reply("I'm not playing anything!");
    if (!message.member!.voice || message.member!.voice.channelID !== message.guild!.me!.voice.channelID)
      return message.reply("You need to be in the same voice channel as the bot!");

    const player = this.bot!.player!.lavalink!.get(message.guild!.id);
    if (!player || !player.playing) return message.reply("Not playing anything right now!");
    const queue = this.bot.player!.queue.getQueue(message.guild!) || await new this.bot.player!.queue(message.guild!)._init();
    if (!queue.queue) return message.reply("Nothing queued right now!");
    const song = queue.queue[0];
    const info = song.info;
    const pos = Math.round(((player.state as any).position / info.length) * 10);
    const pos2 = Math.round(10 - pos);

    let str = `\`${"▬".repeat(pos)}🔘${"▬".repeat(pos2)}\`\n`
    const playingEmbed = new VorteEmbed(message).baseEmbed()
      .setTitle("Now Playing")
      .addField("Song Name", `[${info.title}](${info.uri})`)
      .addField("Author", info.author)
      .addField("Position", str);
    message.channel.send(playingEmbed);
  }
}