import { Guild } from "discord.js";
export declare class Queue {
    guild: Guild;
    queue: object[];
    constructor(guild: Guild);
    _init(): void;
    removeSong(position?: number): Promise<unknown>;
    nextSong(): object;
    static getQueue(guild: Guild): Queue | undefined;
    delete(): void;
}
