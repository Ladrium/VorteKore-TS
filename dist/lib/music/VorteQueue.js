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
const events_1 = require("events");
const util_1 = require("../../util");
const QueueHook_1 = require("../../util/QueueHook");
class VorteQueue extends events_1.EventEmitter {
    constructor(player) {
        super();
        this.player = player;
        this.next = [];
        this.previous = [];
        this.repeat = { queue: false, song: false };
        this.np = { position: 0, skips: new Set() };
        this.hook = new QueueHook_1.QueueHook(this);
        this.player.on("end", (d) => __awaiter(this, void 0, void 0, function* () {
            if (d.type !== 'TrackEndEvent' || !['REPLACED', 'STOPPED'].includes(d.reason)) {
                if (!this.repeat.song)
                    this._next();
                if (this.repeat.queue && !this.np.song) {
                    const previous = this.previous.reverse();
                    this.clear();
                    this.add(previous);
                    this._next();
                }
                if (!this.np.song)
                    return this.emit("finish");
                this.emit("next", this.np);
                yield this.player.play(this.np.song.track);
            }
        })).on("player-update", (d) => {
            this.np.position = d.state.position;
        });
    }
    add(songs, requester) {
        if (!songs.length)
            return 0;
        return this.next.push(...songs.map(song => (Object.assign({ requester }, song))));
    }
    _next() {
        return __awaiter(this, void 0, void 0, function* () {
            const next = this.next.shift();
            if (this.np.song)
                this.previous.unshift(this.np.song);
            this.np = { song: next, position: 0, skips: new Set() };
        });
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.np.song)
                this._next();
            yield this.player.play(this.np.song.track);
            return this.emit("start", this.np);
        });
    }
    stop() {
        return this.player.stop();
    }
    move(from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            if (to >= this.next.length) {
                let k = to - this.next.length + 1;
                while (k--) {
                    this.next.push(undefined);
                }
            }
            this.next.splice(to, 0, this.next.splice(from, 1)[0]);
            return this.next;
        });
    }
    length() {
        return this.next.length;
    }
    sort(predicate) {
        return this.next.sort(predicate);
    }
    clear(stop = false) {
        this.next = [];
        this.previous = [];
        this.np = { position: 0, skips: new Set() };
        if (stop)
            this.stop();
    }
    shuffle() {
        return this.next = util_1.shuffle(this.next);
    }
}
exports.VorteQueue = VorteQueue;
