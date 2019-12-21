/// <reference types="mongoose" />
export declare class Mute {
    userID: string;
    guildID: string;
    mute: any;
    constructor(userID: string, guildID: string);
    _load(): this;
    static getAll(): Promise<import("mongoose").Document[]>;
    static deleteOne(guildID: string, userID: string): void;
    static getOne(userID: string, guildID: string): Promise<import("mongoose").Document | null>;
    setTime(time: number): void;
}
