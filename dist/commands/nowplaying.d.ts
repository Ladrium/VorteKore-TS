import { Command, VorteClient } from "../structures";
import { Message } from "discord.js";
export declare class Cmd extends Command {
    constructor(bot: VorteClient);
    run(message: Message): Promise<Message | undefined>;
}
