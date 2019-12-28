"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../../lib/classes/Command");
const lib_1 = require("../../lib");
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
    async run(message, [...image]) {
        if (!image[0])
            return message.channel.send(new lib_1.VorteEmbed(message).baseEmbed().setDescription("Please provide a query to search."));
        let link = `https://imgur.com/r/${image.join(" ")}/hot.json`;
        const { data } = await node_fetch_1.default(link).then(res => res.json());
        link = data[Math.floor(Math.random() * data.length)];
        if (message.channel.nsfw && link.nsfw)
            return message.reply("Sorry this result was NSFW");
        link = `https://i.imgur.com/${link.hash}${link.ext}`;
        while (!link)
            data[Math.floor(Math.random() * data.length)];
        const emb = new lib_1.VorteEmbed(message).baseEmbed()
            .setColor("#000000")
            .setImage(link);
        if (link.title)
            emb.setTitle(link.title);
        message.channel.send(emb);
    }
}
exports.default = default_1;
