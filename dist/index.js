"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    path: path_1.join(__dirname, "../", ".env")
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
bot.login(process.env.NODE_ENV.ignoreCase("development") ? process.env.TOKEN_BETA : process.env.TOKEN_PROD);
process.on("SIGINT", () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (bot.andesite.userId)
            for (const [id, player] of bot.andesite.players.entries()) {
                yield player.stop();
                yield player.message.sem("Uh oh, the bot just stopped!! Please check in with the developers if the bot goes offline 😱");
                return player.node.leave(id);
            }
        return process.exit(0);
    }
    catch (error) {
        Error.captureStackTrace(error);
        throw error;
    }
}));
