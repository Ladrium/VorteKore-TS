"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../../lib");
const Command_1 = require("../../lib/classes/Command");
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
    async run(message, args) {
        const emb = args.join(" ").split(" | ");
        if (!message.deletable)
            return message.channel.send("Dont have permission to delete the message");
        message.delete();
        message.channel.send(new lib_1.VorteEmbed(message).baseEmbed().setTitle(emb[0]).setDescription(emb[1]).setFooter(message.author.tag, message.author.displayAvatarURL()));
    }
}
exports.default = default_1;
;
