import { Client, ClientOptions, Collection } from "discord.js";
import { Handler } from "./Handler";
import { Player } from "./Player";
export declare class VorteClient extends Client {
    commands: Collection<string, any>;
    aliases: Collection<string, string>;
    handler?: Handler;
    player?: Player;
    nodes: any;
    constructor(nodes: any, options?: ClientOptions);
}
