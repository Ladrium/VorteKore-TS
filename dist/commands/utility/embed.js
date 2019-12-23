"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../../structures/Command");
const structures_1 = require("../../structures");
const util_1 = require("../../util");
class default_1 extends Command_1.Command {
    constructor() {
        super("emb", {
            aliases: ["embed"],
            category: "Utility",
            cooldown: 1000,
            description: "Creates an embed with provided title and description",
            usage: "!embed title | description",
            example: "!embed Cool guy | I know i am really cool"
        });
    }
    run(message, args) {
        if (!util_1.checkPermissions(message.member, "ADMINISTRATOR"))
            return message.channel.send("You dont have permissions.");
        const emb = args.join(" ").split(" | ");
        if (!message.deletable)
            return message.channel.send("Dont have permission to delete the message");
        message.delete();
        message.channel.send(new structures_1.VorteEmbed(message).baseEmbed().setTitle(emb[0]).setDescription(emb[1]).setFooter(message.author.tag, message.author.displayAvatarURL()));
    }
}
exports.default = default_1;
;
