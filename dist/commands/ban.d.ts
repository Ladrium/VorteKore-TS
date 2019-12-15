import { Command } from "../structures/Command";
import { Message } from "discord.js";
import { VorteGuild, VorteClient } from "../structures";
export declare class Cmd extends Command {
    constructor(bot: VorteClient);
    run(message: Message, [mem, ...reason]: any, guild: VorteGuild): Promise<Message> | undefined;
}
