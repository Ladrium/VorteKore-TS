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
const guild_1 = __importDefault(require("../models/guild"));
let thisGuild;
class VorteGuild {
    constructor(guild) {
        this._load(guild);
    }
    _load(g) {
        return __awaiter(this, void 0, void 0, function* () {
            thisGuild = (yield guild_1.default.findOne({ guildID: g.id })) || new guild_1.default({
                guildID: g.id,
                case: 0,
                prefix: "!",
                autoRoles: [],
                staffRoles: [],
                welcome: {},
                leave: {},
                logs: {}
            });
            return this;
        });
    }
    increaseCase() {
        thisGuild.case++;
        thisGuild.save().catch(console.error);
        return this;
    }
    setPrefix(prefix) {
        thisGuild.prefix = prefix;
        thisGuild.save().catch(console.error);
        return this;
    }
    addAutoRole(role) {
        thisGuild.autoRoles.push(role);
        thisGuild.save().catch(console.error);
        return this;
    }
    removeAutoRole(role) {
        const index = thisGuild.autoRoles.findIndex((x) => x === role);
        if (!index)
            return this;
        thisGuild.autoRoles.splice(index, 1);
        thisGuild.save().catch(console.error);
        return this;
    }
}
exports.VorteGuild = VorteGuild;
;
