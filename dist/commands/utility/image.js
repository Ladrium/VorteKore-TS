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
const Command_1 = require("../../structures/Command");
const structures_1 = require("../../structures");
const node_fetch_1 = __importDefault(require("node-fetch"));
class default_1 extends Command_1.Command {
    constructor() {
        super("image", {
            category: "Utility",
            cooldown: 5000,
            description: "Provides you image with provided name",
            example: "!image cow"
        });
    }
    run(message, [...image]) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!image[0])
                return message.channel.send(new structures_1.VorteEmbed(message).baseEmbed().setDescription("Please provide a query to search."));
            let link = `https://imgur.com/r/${image.join(" ")}/hot.json`;
            const { data } = yield node_fetch_1.default(link).then(res => res.json());
            link = data[Math.floor(Math.random() * data.length)];
            if (message.channel.nsfw && link.nsfw)
                return message.reply("Sorry this result was NSFW");
            link = `https://i.imgur.com/${link.hash}${link.ext}`;
            while (!link)
                data[Math.floor(Math.random() * data.length)];
            const emb = new structures_1.VorteEmbed(message).baseEmbed()
                .setColor("#000000")
                .setImage(link);
            if (link.title)
                emb.setTitle(link.title);
            message.channel.send(emb);
        });
    }
}
exports.default = default_1;
