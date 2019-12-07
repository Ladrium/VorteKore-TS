"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Handler_1 = require("./structures/Handler");
const VorteClient_1 = require("./structures/VorteClient");
const dotenv_1 = require("dotenv");
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config"));
dotenv_1.config({
    path: `${__dirname}/../.env`
});
mongoose_1.default.connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (err) => {
    if (err)
        console.log(err);
});
const bot = new VorteClient_1.VorteClient(config_1.default);
bot.handler = new Handler_1.Handler(bot);
bot.handler.loadCommands();
bot.handler.loadEvents();
bot.login(process.env.TOKEN);
