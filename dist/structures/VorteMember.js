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
const member_1 = __importDefault(require("../models/member"));
class VorteMember {
    constructor(id, guildID) {
        this.member;
        this.id = id;
        this.guildid = guildID;
        this._init();
    }
    _init() {
        return __awaiter(this, void 0, void 0, function* () {
            let member = yield member_1.default.findOne({ id: this.id });
            if (!member)
                member = new member_1.default({
                    id: this.id,
                    guildID: this.guildid,
                    coins: 50,
                    xp: 0,
                    level: 0
                });
            this.member = member;
            return this;
        });
    }
    ;
    get coins() {
        return this.member.coins;
    }
    get xp() {
        return this.member.xp;
    }
    get level() {
        return this.member.level;
    }
    add(locale, amount) {
        this.member[locale] += amount;
    }
    set(locale, toSet) {
        this.member[locale] = toSet;
    }
    save() {
        this.member.save().catch(console.error);
    }
}
exports.VorteMember = VorteMember;
;
