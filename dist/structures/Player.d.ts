import { VorteClient } from "./VorteClient";
import { PlayerManager } from "discord.js-lavalink";
import { Queue } from "./Queue";
export declare class Player {
    bot: VorteClient;
    lavalink?: PlayerManager;
    queue: typeof Queue;
    constructor(bot: VorteClient);
    getSongs(query: string): {
        data: null;
        error: null;
    };
    _init(): void;
}
