import { Command } from "../structures/Command";
import { VorteClient, VorteGuild } from "../structures";
import { Message, GuildChannel } from "discord.js";
export declare class Cmd extends Command {
    constructor(bot: VorteClient);
    run(message: Message, args: string[], guild: VorteGuild): import("discord.js").MessageEmbed | Promise<Message> | Promise<GuildChannel> | undefined;
}
