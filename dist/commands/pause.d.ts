import { Command } from "../structures/Command";
import { VorteClient } from "../structures/VorteClient";
import { Message } from "discord.js";
import { VorteGuild } from "../structures/VorteGuild";
export declare class Cmd extends Command {
    constructor(bot: VorteClient);
    run({ guild, member, reply, channel }: Message, query: string[], gui: VorteGuild): Promise<Message | undefined>;
}
