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
class default_1 extends lib_1.Command {
    constructor() {
        super("feedback", {
            aliases: ["thoughts"],
            description: "Provide feedback on the bot!",
            usage: "<thoughts>",
            example: "!feedback fix stuff; or !feedback amazing music quality!",
            category: "Utility"
        });
    }
    run(message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!args.length)
                return message.sem("You should actually put something the next time ;)");
            const Feedback = new lib_1.VorteEmbed(message).baseEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription(args.join(" "))
                .addField("\u200b", `**Sent From**: ${message.guild ? message.guild.name : "DMs"}`);
            yield this.bot.channels.get("631151085150797833").send(Feedback);
            return message.sem("Feedback sent! Thanks <3");
        });
    }
}
exports.default = default_1;
