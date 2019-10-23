"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../structures/Command");
const conf = __importStar(require("../config"));
const VorteEmbed_1 = __importDefault(require("../structures/VorteEmbed"));
class Cmd extends Command_1.Command {
    constructor(bot) {
        super(bot, {
            name: "help",
            category: "Information",
            cooldown: 5000
        });
    }
    run(message, args) {
        message.delete().catch();
        if (!args[0])
            return new VorteEmbed_1.default(message).baseEmbed().setDescription("Please provide a user to ban");
        let member = message.mentions.members.first() || message.guild.members.find(r => r.displayName === args[0]) || message.guild.members.get(args[0]);
        if (!member)
            return message.channel.send("Invalid username/id provided");
        if (!args[1]) {
            return new VorteEmbed_1.default(message).baseEmbed().setDescription("Please provide a specific reason.");
        }
        const reason = args.slice(2).join(" ");
        member.ban({
            reason: reason
        });
        message.channel.send("Succesfully banned the user.");
        message.guild.channels
            .get(conf.channels.mod_logs)
            .send(new VorteEmbed_1.default().baseEmbed().setDescription(`**>** Executor: ${message.author.tag} (${message.author.id})
          **>** Banned: ${member.user.tag} (${member.user.id})
          **>** Reason: ${reason}`));
    }
}
exports.Cmd = Cmd;
;
