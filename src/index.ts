import { Handler } from "./structures/Handler";
import { VorteClient } from "./structures/VorteClient";
import config from "./config";
import mongoose from "mongoose";

mongoose.connect(config.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, (err: Error) => {
  if (err) console.log(err);
});

const bot = new VorteClient();
bot.handler = new Handler(bot);

bot.handler.loadCommands();
bot.handler.loadEvents();


bot.login(config.token);