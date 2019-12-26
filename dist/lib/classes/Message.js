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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const VorteGuild_1 = require("../database/VorteGuild");
const VorteMember_1 = require("../database/VorteMember");
const VorteEmbed_1 = require("./VorteEmbed");
discord_js_1.Structures.extend("Message", (msg) => class VorteMessage extends msg {
    sem(content, _a = {}) {
        var { type = "normal" } = _a, options = __rest(_a, ["type"]);
        const _ = new VorteEmbed_1.VorteEmbed(this);
        const e = _[`${type === "normal" ? "base" : type}Embed`]();
        e.setDescription(content);
        return this.channel.send(e);
    }
    getMember(member = this.member) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.guild)
                return null;
            return yield new VorteMember_1.VorteMember(typeof member === "string"
                ? member
                : member.id, this.guild.id)._init();
        });
    }
    getGuild() {
        if (!this.guild)
            return null;
        return new VorteGuild_1.VorteGuild(this.guild)._init();
    }
});
