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
        super("eval", {
            category: "Developer",
            cooldown: 0,
            description: "Nothing lol",
            example: "!eval <code>",
            usage: "!ban <code>"
        });
    }
    run(message, args, guild) {
        return __awaiter(this, void 0, void 0, function* () {
            let embed;
            if (!["464499620093886486", "413620315508178955"].includes(message.author.id))
                return;
            try {
                const codein = args.join(" ");
                let code = yield eval(codein);
                const ctype = typeof code;
                if (typeof code !== "string") {
                    code = require("util").inspect(code, {
                        depth: 0,
                    });
                }
                embed = new lib_1.VorteEmbed(message)
                    .baseEmbed()
                    .setTitle("Evaluation")
                    .addField("Input", `\`\`\`js\n${codein}\`\`\``)
                    .addField("Output", `\`\`\`js\n${code}\`\`\``)
                    .addField("Type", `\`\`\`js\n${ctype}\`\`\``);
            }
            catch (e) {
                embed = new lib_1.VorteEmbed(message)
                    .baseEmbed()
                    .setTitle("Error")
                    .setColor("#ff0000")
                    .addField("Input", `\`\`\`js\n${args.join(" ")}\`\`\``)
                    .addField("Error", `\`\`\`js\n${e.name}: ${e.message}\`\`\``);
            }
            message.channel.send(embed);
        });
    }
}
exports.default = default_1;
;
