import { TextChannel } from "discord.js";
import ms from "ms";
import { Mute, VorteEmbed, VorteGuild, VorteMessage } from "../../lib";
import { Command } from "../../lib/classes/Command";

export default class extends Command {
  public constructor() {
    super("mute", {
      category: "Moderation",
      description: "Mutes a member",
      usage: "<member> <duration>",
      example: "!mute @user 10m",
      userPermissions: ["MUTE_MEMBERS"],
      channel: "guild"
    });
  }

  public async run(message: VorteMessage, args: string[], guild: VorteGuild = message.getGuild()!) {
    if (message.deletable) await message.delete();
    if (!(args[0] && args[1])) return message.sem("Please provide a mute duration and member.", { type: "error" });

    const member = message.mentions.members!.first() || message.guild!.members.find(r => r.displayName === args[0] || r.id === args[0]);
    if (!member) return message.sem("Invalid member provided");

    const time = ms(args[1]);
    if (!time) return message.sem("Please provide a valid time");

    const muteRole = message.guild!.roles.find((x) => x.name.toLowerCase() === "muted") ||
      await message.guild!.roles.create({
        data: {
          name: "Muted",
          color: "#1f1e1c"
        }
      });

    try {
      await member.roles.add(muteRole);
      const mute = new Mute(member.id, message.guild!.id)
      mute._load().setTime(time);
      message.sem("Successfully muted that member.");
    } catch (error) {
      console.error(`mute command`, error);
      return message.sem(`Sorry, I ran into an error. Please contact the developers too see if they can help!`);
    }


    const { channel, enabled } = guild.getLog("mute");
    guild.increaseCase();
    if (!enabled) return;

    (message.guild!.channels.get(channel.id) as TextChannel).send(
      new VorteEmbed(message)
        .baseEmbed()
        .setTitle(`Moderation: Mute [Case ID: ${guild.case}]`)
        .setDescription([
          `**>** Staff: ${message.author.tag} (${message.author.id})`,
          `**>** Muted: ${member.user.tag}`,
          `**>** Time: ${time}`
        ].join("\n"))
    );
  }
};