import { MessageEmbed, Message } from "discord.js";
export default class {
    baseEmbed(message: Message): MessageEmbed;
    ErrorEmbed(message: Message, error: string): MessageEmbed;
}
