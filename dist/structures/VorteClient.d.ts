import { Client, ClientOptions, Collection } from "discord.js";
import { Handler } from "./Handler";
export declare class VorteClient extends Client {
    commands: Collection<string, any>;
    aliases: Collection<string, string>;
    handler: Handler | undefined;
    constructor(options?: ClientOptions);
}
