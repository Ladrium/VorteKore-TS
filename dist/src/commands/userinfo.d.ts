import { Command } from "../structures/Command";
import { VorteClient, VorteGuild, VorteMember } from "../structures";
import { Message } from "discord.js";
export declare class Cmd extends Command {
    constructor(bot: VorteClient);
    run(message: Message, [mem]: any, guild: VorteGuild, thisMember: VorteMember): Promise<Message | undefined>;
}
