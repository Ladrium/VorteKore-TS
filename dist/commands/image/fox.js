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
    run(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield util_1.get("https://www.reddit.com/r/foxes.json");
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
        });
    }
}
exports.default = default_1;
