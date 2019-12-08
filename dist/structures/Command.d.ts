import { IData } from "../interfaces/IData";
import { VorteClient } from "./VorteClient";
import { Message } from "discord.js";
import { VorteGuild } from "./VorteGuild";
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
    run(message: Message, args: string[] | string, guild: VorteGuild): void;
}
