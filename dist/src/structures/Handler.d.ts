import { VorteClient } from "./VorteClient";
import { Message } from "discord.js";
import { Command } from "./Command";
import { VorteMember } from "./VorteMember";
export declare class Handler {
    bot: VorteClient;
    constructor(client: VorteClient);
    runCommand(message: Message, member: VorteMember): Promise<Message | undefined>;
    loadEvents: () => boolean | void;
    loadCommands: () => boolean | void;
    getCommand(name: string): Command | undefined;
    getAllCommands(): {
        commands: Command[];
        size: number;
    };
}
