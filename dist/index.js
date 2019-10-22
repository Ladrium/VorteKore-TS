"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Handler_1 = require("./structures/Handler");
const VorteClient_1 = require("./structures/VorteClient");
const config_1 = __importDefault(require("./config"));
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect(config_1.default.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (err) => {
    if (err)
        console.log(err);
});
const bot = new VorteClient_1.VorteClient();
bot.handler = new Handler_1.Handler(bot);
bot.handler.loadCommands();
bot.handler.loadEvents();
bot.login(config_1.default.token);
