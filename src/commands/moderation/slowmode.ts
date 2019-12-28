import { GuildChannel, TextChannel } from "discord.js";
import { VorteEmbed, VorteMessage } from "../../lib";
import { Command } from "../../lib/classes/Command";
import ms = require("ms");

export default class extends Command {
  public constructor() {
    super("slowmode", {
      category: "Moderation",
      cooldown: 3000,
      usage: "To remove the slowmode: !slowmode <remove|release|rel>\nTo add the slowmode: !slowmode <time> (reason)",
      channel: "guild",
      userPermissions: ["MANAGE_MESSAGES"]
    });
  }

  public async run(message: VorteMessage, args: string[]) {
    const chan = message.channel as GuildChannel;

    if (["remove" || "release" || "rel"].includes(args[0])) {
      message.sem("Succesffully removed the slowmode")
      return chan.edit({
        rateLimitPerUser: 0
      });
    } else if (!isNaN(args[0] as any) && args[1]) {
      const sec = parseInt(args[0]);

      const reason = args.slice(1).join(" ");
      chan.edit({
        rateLimitPerUser: sec
      });

      const _case = await this.bot.database.newCase(message.guild!.id, {
        type: "slowmode",
        subject: chan.id,
        reason,
        amount: sec,
        moderator: message.author.id
      });

      if (!message._guild!.logs.channel || !message._guild!.logs.slowmode) return;

      const logChannel = message.guild!.channels.get(message._guild!.logs.channel) as TextChannel;
      logChannel.send(
        new VorteEmbed(message)
          .baseEmbed()
          .setTitle(`Moderation: Slowmode (Case ID: ${_case.id})`)
          .setDescription([
            `**Moderator**: ${message.author.tag} (${message.author.id})`,
            `**Channel**: ${chan.name} (${chan.id})`,
            `**Reason**: ${reason}`,
            `**Cooldown**: ${ms(sec)}`
          ].join("\n"))
          .setTimestamp()
      )
    } else {
      return message.sem("Please provide a number, and a reason.")
    }
  } 
};