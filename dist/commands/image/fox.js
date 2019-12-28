"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../../lib");
const Command_1 = require("../../lib/classes/Command");
const util_1 = require("../../util");
class default_1 extends Command_1.Command {
    constructor() {
        super("fox", {
            category: "Image",
            aliases: ["foxes"],
            cooldown: 3000,
            description: "Provides a fox pic from r/foxes",
            example: "!meme"
        });
    }
    async run(message) {
        const { data, error } = await util_1.get("https://www.reddit.com/r/foxes.json");
        if (!data) {
            console.error(error);
            return message.sem(`Sorry, we ran into an error :(`, { type: "error" });
        }
        const images = data.data.children.filter((post) => post.data.post_hint === "image"), image = images[Math.floor(Math.random() * images.length)].data;
        return message.channel.send(new lib_1.VorteEmbed(message).baseEmbed()
            .setAuthor(image.author)
            .setTitle(image.title).setURL(`https://reddit.com${image.permalink}`)
            .setImage(image.url)
            .setFooter(`👍 ${image.ups}`));
    }
}
exports.default = default_1;
