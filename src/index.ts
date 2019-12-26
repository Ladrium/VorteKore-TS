import "./util/Formatter";
import { config } from 'dotenv';
import mongoose from "mongoose";
import { join } from "path";
import { VortePlayer } from './lib';
import "./lib/classes/Message";
import { VorteClient } from "./lib/VorteClient";
import { startServer } from "./web/server";

config({
  path: join(__dirname, "../", ".env")
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

bot.login(process.env.NODE_ENV!.ignoreCase("development") ? process.env.TOKEN_BETA! : process.env.TOKEN_PROD!);

process.on("SIGINT", async () => {
  try {
    if (bot.andesite.userId)
    for (const [id, player] of (<IterableIterator<[string, VortePlayer]>> bot.andesite.players.entries())) {
      await player.stop();
      await player.message.sem("Uh oh, the bot just stopped!! Please check in with the developers if the bot goes offline 😱")
      return player.node.leave(id);
    }
    return process.exit(0);
  } catch (error) {
    Error.captureStackTrace(error);
    throw error;
  }
});