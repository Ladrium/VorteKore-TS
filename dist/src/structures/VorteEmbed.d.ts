import { MessageEmbed, Message } from "discord.js";
export declare class VorteEmbed {
    message: Message;
    constructor(message: Message);
    baseEmbed(): MessageEmbed;
    errorEmbed(error: string): MessageEmbed;
}
