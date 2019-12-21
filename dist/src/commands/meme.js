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
const Command_1 = require("../structures/Command");
const structures_1 = require("../structures");
const node_fetch_1 = __importDefault(require("node-fetch"));
class Cmd extends Command_1.Command {
    constructor(bot) {
        super(bot, {
            name: "meme",
            category: "Fun",
            aliases: ["joke"],
            cooldown: 3000,
            description: "Provides a meme",
            example: "!meme"
        });
    }
    run(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const { image } = yield node_fetch_1.default("https://api.chaosphoe.xyz/meme").then(res => res.json());
            const memeEmbed = new structures_1.VorteEmbed(message)
                .baseEmbed()
                .setImage(image);
            message.channel.send(memeEmbed);
        });
    }
}
exports.Cmd = Cmd;
