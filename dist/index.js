"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./util/Formatter");
const dotenv_1 = require("dotenv");
const path_1 = require("path");
require("./lib/classes/Message");
const VorteClient_1 = require("./lib/VorteClient");
const server_1 = require("./web/server");
const Config_1 = require("./util/Config");
dotenv_1.config({
    path: path_1.join(__dirname, "../", ".env")
});
const bot = new VorteClient_1.VorteClient();
server_1.startServer(bot);
bot.handler.loadCommands();
bot.handler.loadEvents();
bot.login(Config_1.Config.get("token"));
process.on("SIGINT", async () => {
    try {
        if (bot.andesite.userId)
            for (const [id, player] of bot.andesite.players.entries()) {
                await player.stop();
                await player.message.sem("Uh oh, the bot just stopped!! Please check in with the developers if the bot goes offline 😱");
                return player.node.leave(id);
            }
        return process.exit(0);
    }
    catch (error) {
        Error.captureStackTrace(error);
        throw error;
    }
});
