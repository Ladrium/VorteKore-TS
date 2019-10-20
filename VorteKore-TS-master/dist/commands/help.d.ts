import { Command } from "../structures/Command";
import { VorteClient } from "../structures/VorteClient";
import { Message } from "discord.js";
export declare class Help extends Command {
    constructor(bot: VorteClient);
    run(message: Message): void;
}
