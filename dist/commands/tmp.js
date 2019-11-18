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
            name: "tmp",
            category: "Games",
            cooldown: 5000
        });
    }
    run(message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield (yield node_fetch_1.default("https://api.truckersmp.com/v2/servers")).json();
            const emb = new VorteEmbed_1.default(message)
                .baseEmbed();
            data.response.forEach((r) => {
                emb.addField(r.name + `(${r.shortname})`, `Players: ${r.players}/${r.maxplayers}`, true);
            });
            message.channel.send(emb);
        });
    }
}
exports.Cmd = Cmd;
;
