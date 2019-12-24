import { Message } from "discord.js";
import ms from "ms";
import { VorteEmbed, VortePlayer, Command, VorteGuild } from "../../lib";
import { VorteMessage } from "../../lib/classes/Message";


export default class extends Command {
  public constructor() {
    super("join", {
      category: "Music",
      cooldown: 2000,
      description: "Joins your voice channel."
    })
  }

  public async run(message: VorteMessage, _args: string[], { prefix }: VorteGuild) {
		if (this.bot.andesite.players.has(message.guild!.id)) return message.sem(`Use \`${prefix}play\` to queue a song.`);
    if (!message.member!.voice.channel) return message.sem("Please join a voice channel.");

    this.bot.andesite.nodes.ideal.first()!.join<VortePlayer>({
      channelId: message.member!.voice.channelID!,
      guildId: message.guild!.id
		}).useMessage(message);
		
		return message.sem(`Successfully joined **<#${message.member!.voice.channelID}>** 🎵`)
  };
}