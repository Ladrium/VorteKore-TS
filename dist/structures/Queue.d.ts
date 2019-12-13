import { Guild } from "discord.js";
export declare class Queue {
    guild: Guild;
    queue: any[];
    constructor(guild: Guild);
    _init(): this;
    addSong(data: any): void;
    removeSong(position?: number): void;
    nextSong(): any;
    static getQueue(guild: Guild): Queue | undefined;
    delete(): void;
}
