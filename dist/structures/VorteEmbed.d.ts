import { MessageEmbed, Message } from "discord.js";
export default class {
    message: Message;
    constructor(message: Message);
    baseEmbed(): MessageEmbed;
    errorEmbed(error: string): MessageEmbed;
}
