import { MessageEmbed, Message } from "discord.js";
export default class {
    message: Message;
    constructor(message: Message);
    baseEmbed(): MessageEmbed;
    ErrorEmbed(message: Message, error: string): MessageEmbed;
}
