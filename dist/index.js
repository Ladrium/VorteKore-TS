"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Handler_1 = require("./structures/Handler");
const VorteClient_1 = require("./structures/VorteClient");
const dotenv_1 = require("dotenv");
const mongoose_1 = __importDefault(require("mongoose"));
const server_1 = require("./web/server");
const path_1 = require("path");
const util_1 = require("./util");
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
let dbl;
const bot = new VorteClient_1.VorteClient();
bot.handler = new Handler_1.Handler(bot);
server_1.startServer(bot);
if (util_1.Installed("dblapi.js"))
    dbl = new (require("dblapi.js"))(process.env.DBL, bot);
bot.handler.loadCommands();
bot.handler.loadEvents();
bot.login(process.env.TOKEN);
process.on("SIGINT", () => {
    if (bot.andesite.userId)
        for (const [id, { node }] of bot.andesite.players)
            node.leave(id);
    process.exit(0);
});
