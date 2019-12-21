export declare class VorteMember {
    member: any;
    id: string;
    guildid: string;
    constructor(id: string, guildID: string);
    _init(): Promise<this>;
    readonly coins: any;
    readonly xp: any;
    readonly level: any;
    add(locale: string, amount: number): void;
    set(locale: string, toSet: number): void;
    save(): void;
}
