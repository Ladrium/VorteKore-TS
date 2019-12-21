import { Command, VorteClient, VorteGuild } from "../structures";
import { Message } from "discord.js";
export declare class Cmd extends Command {
    constructor(bot: VorteClient);
    run(message: Message, [page]: any, guild: VorteGuild): Promise<void>;
}
