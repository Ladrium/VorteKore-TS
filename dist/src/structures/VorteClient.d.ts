import { Client, ClientOptions, Collection } from "discord.js";
import { Handler } from "./Handler";
import { Player } from "./Player";
import { Command } from "./Command";
export declare class VorteClient extends Client {
    commands: Collection<string, Command>;
    aliases: Collection<string, string>;
    handler?: Handler;
    player?: Player;
    constructor(options?: ClientOptions);
}
