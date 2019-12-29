"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
function findRole(message, role) {
    return message.mentions.roles.first() || message.guild.roles.find((r) => {
        const name = r.name.toLowerCase();
        return name === role || name.toLowerCase().startsWith(role);
    });
}
exports.findRole = findRole;
;
function formatString(message, member) {
    const obj = {
        "{{mention}}": member.toString(),
        "{{member}}": member.user.tag,
        "{{server}}": member.guild.name,
        "{{memberCount}}": member.guild.memberCount
    };
    const string = message.replace(new RegExp(Object.keys(obj).join("|")), (m) => obj[m]);
    return string;
}
exports.formatString = formatString;
async function findMember(message, toFind) {
    let member;
    if (message.mentions && message.mentions.members.size == 0 && message.mentions.users.size > 0) {
        const toFetch = await message.guild.members.fetch(message.mentions.users.first());
        return toFetch;
    }
    else {
        if (!toFind)
            return message.member;
        toFind = toFind.toLowerCase();
        member = message.mentions.members.first() || message.guild.members.find((x) => x.user.username.toLowerCase() === toFind) || message.guild.members.get(toFind);
    }
    return member;
}
exports.findMember = findMember;
exports.get = async (url, options) => {
    return new Promise(resolve => {
        return node_fetch_1.default(url, options)
            .then(async (res) => resolve({ data: await res.json() }), error => resolve({ error }));
    });
};
function _formatTime(ms) {
    let day, hour, minute, seconds;
    seconds = Math.floor(ms / 1000);
    minute = Math.floor(seconds / 60);
    seconds = seconds % 60;
    hour = Math.floor(minute / 60);
    minute = minute % 60;
    day = Math.floor(hour / 24);
    hour = hour % 24;
    return {
        d: day,
        h: hour < 10 ? "0" + hour : hour,
        m: minute < 10 ? "0" + minute : minute,
        s: seconds < 10 ? "0" + seconds : seconds
    };
}
exports._formatTime = _formatTime;
;
function paginate(items, page = 1, pageLength = 10) {
    const maxPage = Math.ceil(items.length / pageLength);
    if (page < 1)
        page = 1;
    if (page > maxPage)
        page = maxPage;
    const startIndex = (page - 1) * pageLength;
    return {
        items: items.length > pageLength ? items.slice(startIndex, startIndex + pageLength) : items,
        page,
        maxPage,
        pageLength
    };
}
exports.paginate = paginate;
function Installed(id) {
    try {
        require(id);
        return true;
    }
    catch (error) {
        return false;
    }
}
exports.Installed = Installed;
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
exports.shuffle = shuffle;
function progressBar(percent, length = 8) {
    let str = "";
    for (let i = 0; i < length; i++) {
        if (i == Math.round(percent * length))
            str += "\uD83D\uDD18";
        else
            str += "▬";
    }
    return str;
}
exports.progressBar = progressBar;
function formatNumber(n) {
    if (n < 1e3)
        return n;
    if (n >= 1e3)
        return +(n / 1e3).toFixed(1) + "K";
}
exports.formatNumber = formatNumber;
;
function getVolumeIcon(volume) {
    if (volume == 0)
        return "\uD83D\uDD07";
    else if (volume < 33)
        return "\uD83D\uDD08";
    else if (volume < 67)
        return "\uD83D\uDD09";
    else
        return "\uD83D\uDD0A";
}
exports.getVolumeIcon = getVolumeIcon;
function formatTime(duration) {
    const minutes = Math.floor(duration / 60000);
    const seconds = ((duration % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}
exports.formatTime = formatTime;
function playerEmbed(player, current) {
    return (player.paused ? "\u23F8" : "\u25B6") + " " +
        progressBar(player.position / current.info.length) +
        `\`[${formatTime(player.position)}/${formatTime(current.info.length)}]\`` +
        getVolumeIcon(player.volume);
}
exports.playerEmbed = playerEmbed;
function isPromise(value) {
    return value
        && typeof value.then === 'function'
        && typeof value.catch === 'function';
}
exports.isPromise = isPromise;
