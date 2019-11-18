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
const node_fetch_1 = __importDefault(require("node-fetch"));
class Cmd extends Command_1.Command {
    constructor(bot) {
        super(bot, {
            name: "overwatch",
            category: "Games",
            cooldown: 5000,
            aliases: ["ow"]
        });
    }
    run(message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!args[0] || !["pc", "xbox", "ps", "switch"].includes(args[0].toLowerCase()))
                return message.channel.send(new VorteEmbed_1.default(message).baseEmbed().setDescription("Please provide a valid platform:- `xbox`, `pc`, `ps`, `switch`"));
            if (!args[1] || !["us", "eu", "asia"].includes(args[1].toLowerCase()))
                return message.channel.send(new VorteEmbed_1.default(message).baseEmbed().setDescription("Please provide a valid platform:- `us`, `asia`,`eu`"));
            if (!args[2])
                return message.channel.send("Please provide a tag.");
            const tag = args[2].replace("#", "-");
            const link = `https://ow-api.com/v1/stats/${args[0].toLowerCase()}/${args[1].toLowerCase()}/${tag}com`;
            const { icon, name, level, endorsement, rating, gamesWon, quickPlayStats, competitiveStats } = yield (yield node_fetch_1.default(link)).json();
            const emb = new VorteEmbed_1.default(message)
                .baseEmbed()
                .setThumbnail(icon)
                .setDescription(`**>** Name: ${name}
        **>** Level: ${level},
        **>** Endorsement Level: ${endorsement}.
        **>** Rating: ${rating},
        **>** Games Won: ${gamesWon},`)
                .addField(`Quick Play Stats`, `**>** Games Won: ${quickPlayStats.games.won}`)
                .addField(`**>** Competitive Stats`, `**>** Games Won: ${competitiveStats.games.won}/${competitiveStats.games.played}
        **>** Gold Medal: ${competitiveStats.awards.medalsGold}`);
            message.channel.send(emb);
        });
    }
}
exports.Cmd = Cmd;
;
