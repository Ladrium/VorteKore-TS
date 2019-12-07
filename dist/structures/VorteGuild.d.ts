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
    get autoRoles(): any;
    get prefix(): any;
    get case(): any;
    get welcome(): {
        enabled: any;
        message: any;
        channel: any;
    };
    get leave(): {
        enabled: any;
        message: any;
        channel: any;
    };
}
