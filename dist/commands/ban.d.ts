import { Command } from "../structures/Command";
import { VorteClient } from "../structures/VorteClient";
import { Message } from "discord.js";
import { VorteGuild } from "../structures/VorteGuild";
export declare class Cmd extends Command {
    constructor(bot: VorteClient);
    run(message: Message, [mem, ...reason]: any, guild: VorteGuild): Promise<Message> | undefined;
}
