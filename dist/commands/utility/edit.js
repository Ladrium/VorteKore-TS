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
        super("edit", {
            category: "Utility",
            cooldown: 0,
            description: "Edits an embed",
            usage: "!edit MessageID Title | Description",
            example: "!edit 648491057318723584 This is the title | This is the Description",
            channel: "guild",
            userPermissions: "ADMINISTRATOR"
        });
    }
    run(message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!args[0])
                return message.sem("Please provide message id to edit the message.");
            const d = args.slice(1).join(" ").split(" | ");
            message.channel.messages.fetch(args[0]).then(msg => {
                msg.edit(new lib_1.VorteEmbed(message).baseEmbed().setTitle(d[0]).setDescription(d[1]).setFooter(`Editted On ${Date.now()}`));
            });
        });
    }
}
exports.default = default_1;
;
