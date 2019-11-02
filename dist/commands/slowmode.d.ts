import { Command } from "../structures/Command";
import { VorteClient } from "../structures/VorteClient";
import { Message, GuildChannel } from "discord.js";
export declare class Cmd extends Command {
    constructor(bot: VorteClient);
    run(message: Message, args: string[]): import("discord.js").MessageEmbed | Promise<GuildChannel> | undefined;
}
