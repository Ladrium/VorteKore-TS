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
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../../lib");
const util_1 = require("../../util");
class default_1 extends lib_1.Command {
    constructor() {
        super("radio", {
            aliases: ["radio-station"],
            description: "Plays a radio station into your voice channel.",
            usage: "<tags>",
            example: "!radio lofi hiphop",
            channel: "guild",
            category: "Music"
        });
    }
    run(message, [...tags]) {
        return __awaiter(this, void 0, void 0, function* () {
            const player = this.bot.andesite.players.get(message.guild.id);
            if (!player)
                return message.sem("The bot isn't in a voice channel.", { type: "error" });
            if (!player.in(message.member))
                return message.sem("Please join the voice channel I'm in.", { type: "error" });
            const fetched = yield util_1.get(`https://fr1.api.radio-browser.info/json/stations/bytag/${tags.join(",")}`);
            if (!fetched.data || !fetched.data.length) {
                console.error("radio command", fetched.error);
                return message.sem("Sorry, I couldn't find any stations with those tags");
            }
            let avaliableStations = fetched.data.filter(station => Boolean(station.lastcheckok) && station.codec.ignoreCase("mp3"));
            if (!avaliableStations.length)
                return message.sem("Sorry, I couldn't find any supported stations :(((", { type: "error" });
            avaliableStations = avaliableStations.slice(0, 10);
            let stations = `Please pick a radio station.\n`;
            avaliableStations.forEach((station, index) => {
                stations += `**${index + 1}.** [${station.countrycode}] ${station.name} [${station.tags.split(",").slice(0, 5).join(", ")}]\n`;
            });
            const choice = yield message.sem(stations);
            try {
                const collected = yield choice.channel.awaitMessages((m) => {
                    if (m.author.id !== message.author.id)
                        return false;
                    else if (m.content.ignoreCase("cancel") || Number(m.content) > avaliableStations.length || Number(m.content) < 1)
                        return false;
                    else
                        return true;
                }, {
                    max: 1,
                    errors: ["time"],
                    time: 20000
                });
                if (!collected.size || !collected.first())
                    return message.sem("C'mon man... I just needed a number 1 through 10 *sobs*");
                if (collected.first().content.ignoreCase("cancel"))
                    return message.sem("Cancelled radio streaming...");
                const station = avaliableStations[Number(collected.first().content) - 1];
                if (!station)
                    return message.sem("HMMM, i think I broke, fuck... contact my developers :((((((", { type: "error" });
                const search = yield this.bot.andesite.search(station.url_resolved, player.node);
                if (["NO_MATCHES", "LOAD_FAILED"].includes(search.loadType))
                    return message.sem("Sorry, I guess we couldn't play this one :(", { type: "error" });
                player.radio = station;
                yield player.play(search.tracks[0].track);
                return message.sem(`***VorteKore 420.69 FM*** [${station.name}](${station.homepage})\n*you won't get updates when a new song plays*`, { type: "music" });
            }
            catch (e) {
                return message.sem("Sorry buckaroo you ran out of time :p", { type: "error" });
            }
        });
    }
}
exports.default = default_1;
