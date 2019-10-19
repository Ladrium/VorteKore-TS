import { Handler } from "./structures/Handler";
import { VorteClient } from "./structures/VorteClient";
import { config } from "dotenv";

config({ path: `${__dirname}/../.env` })

const bot = new VorteClient();
const handler = new Handler(bot);

handler.loadCommands();
handler.loadEvents();

export = handler;

bot.login(process.env.TOKEN);