import { Command, VorteClient, VorteGuild } from "../structures";
import { Message } from "discord.js";
export declare class Cmd extends Command {
    constructor(bot: VorteClient);
    run(message: Message, []: any, guild: VorteGuild): Promise<void>;
}
