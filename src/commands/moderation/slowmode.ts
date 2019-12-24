import { GuildChannel, Message, TextChannel } from "discord.js";
import { VorteEmbed, VorteGuild } from "../../lib";
import { Command } from "../../lib/classes/Command";
import { checkPermissions } from "../../util";

export default class extends Command {
  public constructor() {
    super("slowmode", {
      category: "Moderation",
      cooldown: 3000,
      usage: "To remove the slowmode: !slowmode <remove|release|rel>\nTo add the slowmode: !slowmode <time> (reason)"
    });
  }

  public run(message: Message, args: string[], guild: VorteGuild) {
    const chan = message.channel as GuildChannel;
    if (!checkPermissions(message.member!, "MANAGE_CHANNELS")) return message.channel.send(new VorteEmbed(message).errorEmbed("Missing Permissions!"));
    if (!args[0]) return new VorteEmbed(message).baseEmbed().setDescription("Please provide a valid number");
    if (args[0].toLowerCase() === "remove" || "release" || "rel") {
      message.channel.send("Succesffully removed the slowmode")
      return chan.edit({
        rateLimitPerUser: 0
      });
    } else {;
    const sec = parseInt(args[0]);
    const reason = args.slice(1).join(" ") || "No reason provided";
    chan.edit({
      rateLimitPerUser: sec
    });
    const { channel, enabled } = guild.getLog("slowmode");
    if (!enabled) return;
    guild.increaseCase()
    const cha = message.guild!.channels.get(channel.id) as TextChannel;
    cha.send(
      new VorteEmbed(message)
        .baseEmbed()
        .setDescription(`**>** Executor: ${message.author.tag} (${message.author.id})\n**>** Channel: ${chan.name} (${chan.id})\n**>** Reason: ${reason}`)
        .setTimestamp()
    )
    if (reason) {
      message.channel.send(`This channel is in slowmode due to: ${reason}`);
    }}
  }
};