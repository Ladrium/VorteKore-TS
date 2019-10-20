import handler = require("..");
import { Message } from "discord.js";
import { VorteClient } from "../structures/VorteClient";

const prefix = "!";
export = (bot: VorteClient, message: Message) => {
  handler.runCommand(message, prefix);
};