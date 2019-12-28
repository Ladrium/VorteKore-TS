import { TextChannel, Util } from "discord.js";
import { Event, VorteEmbed, VorteMessage } from "../../lib";

export default class extends Event {
  public constructor() {
    super("message-deleted", {
      category: "guild",
      event: "messageDelete"
    });
  }

  async run(message: VorteMessage) {
    const guild = await this.bot.database.getGuild(message.guild!.id)
    const { logs: { dltmsg, channel } } = guild;
    if (!dltmsg) return;

    const chan = message.guild!.channels.get(channel) as TextChannel;

    chan.send(
      new VorteEmbed(message)
        .baseEmbed()
        .setTitle(`Event: Message Delete`)
        .setDescription([
          `**Channel**: ${message.channel} (${message.channel.id})`,
          `**Link**: ${message.url}`,
          `**Author**: ${message.author.tag} (${message.author.id})`
        ].join("\n"))
        .addField(`Message Content`, `${Util.escapeMarkdown(message.cleanContent.slice(0, 900))}`)
        .setTimestamp()
    );
  };
}