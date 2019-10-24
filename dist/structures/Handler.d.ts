import { VorteClient } from "./VorteClient";
import { Message } from "discord.js";
export declare class Handler {
    bot: VorteClient;
    constructor(client: VorteClient);
    runCommand(message: Message, prefix: string): Promise<Message | undefined>;
    loadEvents: () => boolean | void;
    loadCommands: () => boolean | void;
    getCommand(name: string): any;
    getAllCommands(): object;
}
