import { IData } from "../interfaces/IData";
import { Message } from "discord.js";
import { VorteGuild, VorteMember, VorteClient } from "./";
export declare class Command {
    bot: VorteClient;
    name: string;
    aliases: string[];
    category: string;
    usage: string;
    description: string | undefined;
    example: string | undefined;
    cooldown: number;
    constructor(bot: VorteClient, data: IData);
    run(message: Message, args: string[] | string, guild: VorteGuild, member: VorteMember): void;
}
