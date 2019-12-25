"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = require("path");
require("./lib/classes/Message");
const VorteClient_1 = require("./lib/VorteClient");
const server_1 = require("./web/server");
dotenv_1.config({
    path: path_1.join(process.cwd(), ".env")
});
mongoose_1.default.connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (err) => {
    if (err)
        console.log(err);
});
const bot = new VorteClient_1.VorteClient();
server_1.startServer(bot);
bot.handler.loadCommands();
bot.handler.loadEvents();
bot.login(process.env.TOKEN);
process.on("SIGINT", () => {
    if (bot.andesite.userId)
        for (const [id, { node }] of bot.andesite.players)
            node.leave(id);
    process.exit(0);
});
