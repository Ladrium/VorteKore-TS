import "./lib/classes/Message";
import { Handler } from "./lib/classes/Handler";
import { VorteClient } from "./lib/VorteClient";
import { config } from 'dotenv';
import mongoose from "mongoose";

import { startServer } from "./web/server";
import { join } from "path";
import { Installed } from "./util";

config({
  path: join(process.cwd(), ".env")
});


mongoose.connect(process.env.URI!, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, (err: Error) => {
  if (err) console.log(err);
});

let dbl;
const bot = new VorteClient();
bot.handler = new Handler(bot);
startServer(bot);

bot.handler.loadCommands();
bot.handler.loadEvents();

bot.login(process.env.TOKEN);

process.on("SIGINT", () => {
  if (bot.andesite.userId)
    for (const [id, { node }] of bot.andesite.players)
      node.leave(id);
  process.exit(0);
});