import { GuildMember, VoiceChannel } from "discord.js";
import { Player } from "discord.js-andesite";
import { VorteMessage } from "../classes/Message";
import { VorteQueue } from "./VorteQueue";

export class VortePlayer extends Player {
  public readonly queue: VorteQueue = new VorteQueue(this);
  public message!: VorteMessage;
  public bass: "high" | "medium" | "low" | "none" = "none";

  public useMessage(message: VorteMessage): VortePlayer {
    this.message = message;
    return this;
  }

  public in(member: GuildMember): boolean {
    const channel = <VoiceChannel>member.guild.channels.get(this.channelId);
    return channel.members.has(member.user.id);
  }
}