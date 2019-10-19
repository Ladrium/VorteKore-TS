import { Handler } from "./structures/Handler";
import { VorteClient } from "./structures/VorteClient";
import { config } from "dotenv";

config({ path: `${__dirname}/../.env` })

const bot = new VorteClient();
bot.handler = new Handler(bot);

bot.handler.loadCommands();
bot.handler.loadEvents();

bot.login(process.env.TOKEN);