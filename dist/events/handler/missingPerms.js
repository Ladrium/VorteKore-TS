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
class CommandBlocked extends lib_1.Event {
    constructor() {
        super("missingPermissions", {
            category: "Handler",
            event: "missingPermissions",
            emitter: "handler"
        });
    }
    run(message, _c, missing, botOrMember) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
}
exports.default = CommandBlocked;
