import { VorteClient } from "./VorteClient";
import { Message } from "discord.js";
export declare class Handler {
    bot: VorteClient;
    constructor(client: VorteClient);
    runCommand(message: Message): Promise<Message | undefined>;
    loadEvents: () => boolean | void;
    loadCommands: () => boolean | void;
    getCommand(name: string): any;
    getAllCommands(): {
        commands: any[];
        size: number;
    };
}
