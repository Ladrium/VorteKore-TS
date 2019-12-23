import { Handler } from "./structures/Handler";
import { VorteClient } from "./structures";
import { config } from 'dotenv';
import mongoose from "mongoose";
import DBL from "dblapi.js";

import startServer from "./web/index.js";

config({
  path: `${__dirname}/../.env`
});


mongoose.connect(process.env.URI!, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, (err: Error) => {
  if (err) console.log(err);
});

const bot = new VorteClient();
bot.handler = new Handler(bot);
startServer(bot);

bot.dbl = new DBL(process.env.DBLTOKEN!, bot);

bot.handler.loadCommands();
bot.handler.loadEvents();

bot.login(process.env.TOKEN);