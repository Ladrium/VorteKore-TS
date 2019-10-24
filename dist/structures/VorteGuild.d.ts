import { Guild as guild } from "discord.js";
export declare class VorteGuild {
    guild: any;
    constructor();
    _load(g: guild): Promise<this>;
    increaseCase(): this;
    setPrefix(prefix: string): this;
    addAutoRole(role: string): this | void;
    removeAutoRole(role: string): this;
    readonly this: any;
    readonly prefix: any;
}
