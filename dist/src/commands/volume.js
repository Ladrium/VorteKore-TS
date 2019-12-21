"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const structures_1 = require("../structures");
const util_1 = require("../util");
class Cmd extends structures_1.Command {
    constructor(bot) {
        super(bot, {
            name: "volume",
            aliases: ["vol"],
            category: "Music",
            cooldown: 0
        });
    }
    run(message, [volume]) {
        if (!util_1.checkDJ(message.member) && !util_1.checkPermissions(message.member))
            return message.reply("Not enough permissions!");
        if (!message.guild.me.voice)
            return message.reply("I'm not playing anything!");
        if (!message.member.voice || message.member.voice.channelID !== message.guild.me.voice.channelID)
            return message.reply("You need to be in the same voice channel as the bot!");
        const player = this.bot.player.lavalink.get(message.guild.id);
        if (!player || !player.playing)
            return message.reply("Not playing anything right now!");
        if (isNaN(volume) || volume.includes("-") || volume.includes(".") || volume > 100 || volume < 1)
            return message.reply("Please return a valid number between 1-100");
        volume = parseInt(volume);
        player.volume(volume);
        message.channel.send(`Set the Volume to: \`${volume}\``);
    }
}
exports.Cmd = Cmd;
