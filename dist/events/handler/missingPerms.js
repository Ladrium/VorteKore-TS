"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../../lib");
class CommandBlocked extends lib_1.Event {
    constructor() {
        super("missingPermissions", {
            category: "Handler",
            event: "missingPermissions",
            emitter: "handler"
        });
    }
    async run(message, _c, missing, botOrMember) {
        switch (botOrMember) {
            case "bot":
                message.sem([
                    `Sorry, I need to following permissions for me to process your request :(`,
                    Array.isArray(missing) ? missing.map((p, i) => `**${i++}**. ${p}}`) : `**1**. ${missing}`
                ].join("\n"));
                break;
            case "member":
                if (missing === "DJ")
                    return message.sem("Sorry, you need a role called `DJ` to run this command!", { type: "error" });
                message.sem([
                    `Sorry, you need the following permissions to run this command`,
                    Array.isArray(missing) ? missing.map((p, i) => `**${++i}**. ${p}`) : `**1**. ${missing}`
                ].join("\n"));
                break;
        }
    }
}
exports.default = CommandBlocked;
