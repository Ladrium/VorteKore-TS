"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const VorteEmbed_1 = require("./VorteEmbed");
discord_js_1.Structures.extend("Message", (msg) => class VorteMessage extends msg {
    async init() {
        if (this.guild && !this.author.bot) {
            this._guild = await this.client.database.getGuild(this.guild.id);
            this.profile = await this.client.database.getProfile(this.author.id, this.guild.id);
        }
    }
    sem(content, { type = "normal", ...options } = {}) {
        const _ = new VorteEmbed_1.VorteEmbed(this);
        const e = _[`${type === "normal" ? "base" : type}Embed`]();
        e.setDescription(content);
        return this.channel.send(e);
    }
    get player() {
        if (!this.guild)
            return;
        const id = this.guild.id;
        return this.client.andesite.players.get(id);
    }
});
