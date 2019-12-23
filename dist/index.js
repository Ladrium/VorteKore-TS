"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Handler_1 = require("./structures/Handler");
const structures_1 = require("./structures");
const dotenv_1 = require("dotenv");
const mongoose_1 = __importDefault(require("mongoose"));
const dblapi_js_1 = __importDefault(require("dblapi.js"));
const index_js_1 = __importDefault(require("./web/index.js"));
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
const bot = new structures_1.VorteClient();
bot.handler = new Handler_1.Handler(bot);
index_js_1.default(bot);
bot.dbl = new dblapi_js_1.default(process.env.DBLTOKEN, bot);
bot.handler.loadCommands();
bot.handler.loadEvents();
bot.login(process.env.TOKEN);
