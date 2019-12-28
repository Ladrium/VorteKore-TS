"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../../lib");
const Command_1 = require("../../lib/classes/Command");
const util_1 = require("../../util");
class default_1 extends Command_1.Command {
    constructor() {
        super("dog", {
            category: "Image",
            aliases: ["doggy"],
            cooldown: 3000,
            description: "Provides a dog pic from imgur",
            example: "!meme"
        });
    }
    async run(message) {
        const { data, error } = await util_1.get("https://www.imgur.com/r/dog/hot.json");
        if (!data) {
            console.error(error);
            return message.sem(`Sorry, we ran into an error :(`, { type: "error" });
        }
        const image = data.data[Math.floor(Math.random() * data.data.length)];
        return message.channel.send(new lib_1.VorteEmbed(message).baseEmbed()
            .setAuthor(image.author)
            .setTitle(image.title).setURL(`https://imgur.com/${image.hash}`)
            .setImage(`https://imgur.com/${image.hash}${image.ext}`)
            .setFooter(`👀 ${image.views} ❤️ ${image.score}`));
    }
}
exports.default = default_1;
