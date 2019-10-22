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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../structures/Command");
const VorteEmbed_1 = __importDefault(require("../structures/VorteEmbed"));
class Cmd extends Command_1.Command {
    constructor(bot) {
        super(bot, {
            name: "role",
            category: "Moderation",
            cooldown: 0,
            usage: "!role <add|remove> @member role",
            example: "!role remove @Chaos_Phoe#0001 Contributor"
        });
    }
    run(message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!args[0])
                return message.channel.send(new VorteEmbed_1.default(message).errorEmbed("Provide if you want to add or remove the role!"));
            if (!args[1])
<<<<<<< HEAD
                return message.channel.send(new VorteEmbed_1.default(message).baseEmbed().setDescription('Please provide a member'));
            const member = message.mentions.members.first() || message.guild.members.find(x => x.displayName === args[1]) || (yield message.guild.members.fetch(args[1]));
            if (!member)
                return message.channel.send(new VorteEmbed_1.default(message).baseEmbed().setDescription("Unable to find the member."));
            if (!args[2])
                return message.channel.send(new VorteEmbed_1.default(message).baseEmbed().setDescription("Please provide a specific role."));
=======
                return message.channel.send(new VorteEmbed_1.default(message).errorEmbed("Provide a member to add/remove the role to!"));
            if (!args[2])
                return message.channel.send(new VorteEmbed_1.default(message).errorEmbed("Provide a role to add/remove!"));
            const member = message.mentions.members.first() || message.guild.members.find(x => x.displayName === args[1]) || (yield message.guild.members.fetch(args[1]));
>>>>>>> 5a40d99e1feda73ad61833cec5c3813f19d2e95e
            const role = message.mentions.roles.first() || message.guild.roles.find(r => r.name === args[2]) || message.guild.roles.get(args[2]);
            if (!member)
                return message.channel.send(new VorteEmbed_1.default(message).errorEmbed("Unable to find the member."));
            if (!role)
<<<<<<< HEAD
                return message.channel.send(new VorteEmbed_1.default(message).baseEmbed().setDescription("Unable to find the role."));
=======
                return message.channel.send(new VorteEmbed_1.default(message).errorEmbed("Unable to find the role."));
>>>>>>> 5a40d99e1feda73ad61833cec5c3813f19d2e95e
            if (args[0].toLowerCase() === 'add') {
                member.roles.add(role);
                message.channel.send(new VorteEmbed_1.default(message).baseEmbed().setDescription("Succesfully added the role."));
            }
            else if (args[0] === 'remove') {
                member.roles.remove(role);
                message.channel.send(new VorteEmbed_1.default(message).baseEmbed().setDescription("Succesfully removed the role."));
<<<<<<< HEAD
=======
            }
            else {
                message.reply("Please use !help role");
>>>>>>> 5a40d99e1feda73ad61833cec5c3813f19d2e95e
            }
        });
    }
}
exports.Cmd = Cmd;
;
