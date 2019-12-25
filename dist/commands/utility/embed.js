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
const Command_1 = require("../../lib/classes/Command");
const lib_1 = require("../../lib");
class default_1 extends Command_1.Command {
    constructor() {
        super("emb", {
            aliases: ["embed"],
            category: "Utility",
            cooldown: 1000,
            description: "Creates an embed with provided title and description",
            usage: "<title> | <description>",
            example: "!embed Cool guy | I know i am really cool",
            userPermissions: ["ADMINISTRATOR"]
        });
    }
    run(message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const emb = args.join(" ").split(" | ");
            if (!message.deletable)
                return message.channel.send("Dont have permission to delete the message");
            message.delete();
            message.channel.send(new lib_1.VorteEmbed(message).baseEmbed().setTitle(emb[0]).setDescription(emb[1]).setFooter(message.author.tag, message.author.displayAvatarURL()));
        });
    }
}
exports.default = default_1;
;
