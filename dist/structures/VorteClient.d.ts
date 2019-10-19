import { Client, ClientOptions, Collection } from "discord.js";
export declare class VorteClient extends Client {
    commands: Collection<string, any>;
    aliases: Collection<string, string>;
    constructor(options?: ClientOptions);
}
