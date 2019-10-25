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
    run(message, args, guild) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!args[0])
                return message.channel.send(new VorteEmbed_1.default(message).errorEmbed("Provide if you want to add or remove the role!"));
            if (!args[1])
                return message.channel.send(new VorteEmbed_1.default(message).errorEmbed("Provide a member to add/remove the role to!"));
            if (!args[2])
                return message.channel.send(new VorteEmbed_1.default(message).errorEmbed("Provide a role to add/remove!"));
            const member = message.mentions.members.first() || message.guild.members.find(x => x.displayName === args[1]) || (yield message.guild.members.fetch(args[1]));
            const role = message.mentions.roles.first() || message.guild.roles.find(r => r.name === args[2]) || message.guild.roles.get(args[2]);
            if (!member)
                return message.channel.send(new VorteEmbed_1.default(message).errorEmbed("Unable to find the member."));
            if (!role)
                return message.channel.send(new VorteEmbed_1.default(message).errorEmbed("Unable to find the role."));
            if (args[0].toLowerCase() === 'add') {
                member.roles.add(role);
                message.channel.send(new VorteEmbed_1.default(message).baseEmbed().setDescription("Succesfully added the role."));
                guild.increaseCase();
                const { channel, enabled } = guild.getLog("roleAdd");
                if (enabled == false)
                    return;
                const chan = message.guild.channels.find(c => c.id === channel.id);
                chan.send(new VorteEmbed_1.default(message).baseEmbed().setTitle(`Moderation: Role Add [Case ID: ${guild.case}]`).setDescription(`**>** Executor: ${message.author.tag} (${message.author.id})
          **>** User: ${member.user.tag} (${member.user.id})
          **>** Role Added: ${role.name}`).setTimestamp());
            }
            else if (args[0] === 'remove') {
                member.roles.remove(role);
                message.channel.send(new VorteEmbed_1.default(message).baseEmbed().setDescription("Succesfully removed the role."));
                guild.increaseCase();
                const { channel, enabled } = guild.getLog("roleRemove");
                if (!enabled)
                    return;
                const chan = message.guild.channels.find(c => c.id === channel.id);
                chan.send(new VorteEmbed_1.default(message).baseEmbed().setTitle(`Moderation: Role Remove [Case ID: ${guild.case}]`).setDescription(`**>** Executor: ${message.author.tag} (${message.author.id})
          **>** User: ${member.user.tag} (${member.user.id})
          **>** Role Removed: ${role.name}`).setTimestamp());
            }
            else {
                return message.channel.send("What do you want to do? \`Add\`/\`Remove\`");
            }
        });
    }
}
exports.Cmd = Cmd;
;
