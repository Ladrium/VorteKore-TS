import { Guild as guild } from "discord.js";
export declare class VorteGuild {
    guild: any;
    constructor();
    _load(g: guild): Promise<this>;
    static delete(guild: guild): void;
    increaseCase(): this;
    setPrefix(prefix: string): this;
    addRole(locale: string, role: string): this;
    removeRole(locale: string, role: string): this;
    setLog(log: string, query: string | boolean): void;
    setAutoMessage(locale: string, toSet: string, query: string | boolean): void;
    getLog(log: string): {
        enabled: any;
        channel: any;
    };
    readonly autoRoles: any;
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
