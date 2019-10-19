import { Message } from "discord.js";
import { VorteClient } from "../structures/VorteClient";

const prefix = "!";
export = (bot: VorteClient, message: Message) => {
  bot.handler!.runCommand(message, prefix);
};