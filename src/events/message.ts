import { Message } from "discord.js";
import { VorteClient } from "../structures/VorteClient";

export = (bot: VorteClient, message: Message) => {
  bot.handler!.runCommand(message);
};