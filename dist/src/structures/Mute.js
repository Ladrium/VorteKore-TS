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
const mutes_1 = __importDefault(require("../models/mutes"));
class Mute {
    constructor(userID, guildID) {
        this.userID = userID;
        this.guildID = guildID;
        this.mute;
    }
    _load() {
        this.mute = new mutes_1.default({
            userID: this.userID,
            guildID: this.guildID,
        });
        return this;
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const mutes = yield mutes_1.default.find({});
            return mutes || null;
        });
    }
    static deleteOne(guildID, userID) {
        mutes_1.default.deleteOne({ guildID: guildID, userID: userID }, (err) => {
            if (err)
                console.error(err);
        });
    }
    static getOne(userID, guildID) {
        return __awaiter(this, void 0, void 0, function* () {
            const thisMute = yield mutes_1.default.findOne({ userID: userID, guildID: guildID });
            return thisMute || null;
        });
    }
    setTime(time) {
        this.mute.time = time;
        this.mute.save().catch(console.error);
    }
}
exports.Mute = Mute;
