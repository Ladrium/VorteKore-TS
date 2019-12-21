import { Command } from "../structures/Command";
import { VorteClient } from "../structures/VorteClient";
import { Message } from "discord.js";
export declare class Cmd extends Command {
    constructor(bot: VorteClient);
    run({ guild, member, reply, channel }: Message, query: string[]): Promise<boolean | Message | undefined>;
}
