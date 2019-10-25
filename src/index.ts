import { Handler } from "./structures/Handler";
import { VorteClient } from "./structures/VorteClient";
import { config } from 'dotenv';
import mongoose from "mongoose";

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

bot.handler.loadCommands();
bot.handler.loadEvents();


bot.login(process.env.TOKEN);