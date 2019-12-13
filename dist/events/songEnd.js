"use strict";
module.exports = (bot, data, player, queue, { guild, channel }) => {
    if (data.reason === "REPLACED")
        return;
    queue.queue = queue.queue.slice(1);
    const nextSong = queue.nextSong();
    if (!nextSong)
        return bot.player.lavalink.leave(guild.id);
    player.play(nextSong.track)
        .on("end", (data) => bot.emit("songEnd", data, player, queue, { guild, channel }));
    channel.send(`Now playing: \`${nextSong.info.title}\``);
};
