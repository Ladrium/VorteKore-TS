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
const node_fetch_1 = __importDefault(require("node-fetch"));
const VorteEmbed_1 = __importDefault(require("../structures/VorteEmbed"));
class Cmd extends Command_1.Command {
    constructor(bot) {
        super(bot, {
            name: "image",
            category: "Information",
            cooldown: 5000
        });
    }
    run(message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const image = args[0];
            if (!image)
                return message.channel.send(new VorteEmbed_1.default(message).baseEmbed().setDescription("Please provide a query to search."));
            const url = "https://api.imgur.com/3/gallery/search?q=" + image;
            const file = yield (yield node_fetch_1.default(url, {
                method: "GET",
                headers: {
                    "Authorization": "CLIENT-ID f5f2386108961d7",
                },
            })).json();
            let num = Math.floor(Math.random() * file.data.length);
            if (file.data[num].images[0] == null || undefined)
                return message.channel.send(new VorteEmbed_1.default(message).baseEmbed().setDescription("Couldn't able to find image"));
            let link = file.data[num].images[0].link;
            1;
            while (file.data[num].images[0].animated == true) {
                num = Math.floor(Math.random() * file.data.length);
                link = file.data[num].images[0].link;
            }
            const emb = new VorteEmbed_1.default(message).baseEmbed()
                .setColor("#000000")
                .setImage(link);
            message.channel.send(emb);
        });
    }
}
exports.Cmd = Cmd;
