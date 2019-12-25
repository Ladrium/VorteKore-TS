import { config } from 'dotenv';
import mongoose from "mongoose";
import { join } from "path";
import "./lib/classes/Message";
import { VorteClient } from "./lib/VorteClient";
import { startServer } from "./web/server";


config({
  path: join(process.cwd(), ".env")
});

mongoose.connect(process.env.URI!, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, (err: Error) => {
  if (err) console.log(err);
});

const bot = new VorteClient();
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