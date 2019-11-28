"use strict";
module.exports = (bot, mem, guild) => {
    const { channel, enabled, message } = guild.welcome;
    if (!enabled)
        return;
    mem.guild.channels.get(channel.id).send(message);
};
