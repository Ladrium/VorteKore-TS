"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../../lib");
const util_1 = require("../../util");
class default_1 extends lib_1.Command {
    constructor() {
        super("eval", {
            category: "Developer",
            cooldown: 0,
            description: "Nothing lol",
            example: "!eval <code>",
            usage: "!ban <code>",
            devOnly: true
        });
    }
    async run(message, args) {
        let embed;
        try {
            const codein = args.join(" ");
            let code = eval(codein);
            if (util_1.isPromise(code))
                code = await code;
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
            message.channel.send(embed);
        }
        catch (e) {
            embed = new lib_1.VorteEmbed(message)
                .baseEmbed()
                .setTitle("Error")
                .setColor("#ff0000")
                .addField("Input", `\`\`\`js\n${args.join(" ")}\`\`\``)
                .addField("Error", `\`\`\`js\n${e.name}: ${e.message}\`\`\``);
            message.channel.send(embed);
        }
    }
}
exports.default = default_1;
;
