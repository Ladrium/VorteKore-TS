import { Command } from "../structures/Command";
import { VorteClient, VorteGuild } from "../structures";
import { Message } from "discord.js";
export declare class Cmd extends Command {
    constructor(bot: VorteClient);
    run(message: Message, args: string[], guild: VorteGuild): Promise<void>;
}
