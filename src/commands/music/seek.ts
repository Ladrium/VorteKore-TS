import { Command } from "../../structures/Command";
import { VorteClient } from "../../structures/VorteClient";
import { Message } from "discord.js";
import { checkDJ, checkPermissions } from "../../util";

export default class extends Command {
  public constructor() {
    super("seek", {
      category: "Music",
      cooldown: 0,
      example: "!seek 5s"
    });
  }
  
  public async run({ guild, member, reply, channel }: Message, [time]: string) {
    if (!checkDJ(member!) && !checkPermissions(member!, "ADMINISTRATOR")) return channel.send("You don't have permissions for this command!");

    const player = this.bot.andesite!.players!.get(guild!.id)!;
    if (!player || !player.playing) return channel.send("The bot isn't playing any music yet!");

    const match = time.match(/(.*)s/)!;
    if (!match || !match[1]) return channel.send("Please provide a time to skip in (provide it in seconds, Example: !seek 5s)");

    let number = parseInt(match[1]);
    if (isNaN(number) || match[1].includes("-")) return channel.send("Provide a correct time to seek to (Example: !seek 5s)");
    
    number = number * 1000;
    player.seek(number);
  }
}