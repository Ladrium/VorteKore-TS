import { Guild as guild } from "discord.js";
export declare class VorteGuild {
    guild: any;
    constructor();
    _load(g: guild): Promise<this>;
    increaseCase(): this;
    setPrefix(prefix: string): this;
    addRole(locale: string, role: string): this;
    removeRole(whereToRemove: string, role: string): this;
    getLog(log: string): {
        enabled: any;
        channel: any;
    };
    readonly prefix: any;
    readonly case: any;
    readonly welcome: {
        enabled: any;
        message: any;
        channel: any;
    };
    readonly leave: {
        enabled: any;
        message: any;
        channel: any;
    };
}
