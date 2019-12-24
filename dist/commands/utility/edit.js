"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../../lib/classes/Command");
const lib_1 = require("../../lib");
const util_1 = require("../../util");
class default_1 extends Command_1.Command {
    constructor() {
        super("edit", {
            category: "Utility",
            cooldown: 0,
            description: "Edits an embed",
            usage: "!edit MessageID Title | Description",
            example: "!edit 648491057318723584 This is the title | This is the Description"
        });
    }
    run(message, args) {
        if (!util_1.checkPermissions(message.member, "ADMINISTRATOR"))
            return message.sem("You dont have permissions.");
        if (!args[0])
            return message.sem("Please provide message id to edit the message.");
        const d = args.slice(1).join(" ").split(" | ");
        message.channel.messages.fetch(args[0]).then(msg => {
            msg.edit(new lib_1.VorteEmbed(message).baseEmbed().setTitle(d[0]).setDescription(d[1]).setFooter(`Editted On ${Date.now()}`));
        });
    }
}
exports.default = default_1;
;
