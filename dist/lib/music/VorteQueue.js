"use strict";
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
        this.player.on("end", async (d) => {
            if (this.player.radio)
                return;
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
                const channel = this.player.node.manager.client.channels.get(player.channelId);
                if (!channel || !(channel.members.filter(m => !m.user.bot).size))
                    return this.emit("last_man_standing");
                this.emit("next", this.np);
                await this.player.play(this.np.song.track);
            }
        }).on("player-update", (d) => {
            this.np.position = d.state.position;
        });
    }
    add(songs, requester) {
        if (!songs.length)
            return 0;
        return this.next.push(...songs.map(song => ({ requester, ...song })));
    }
    async _next() {
        const next = this.next.shift();
        if (this.np.song)
            this.previous.unshift(this.np.song);
        this.np = { song: next, position: 0, skips: new Set() };
    }
    async start() {
        if (!this.np.song)
            this._next();
        await this.player.play(this.np.song.track);
        return this.emit("start", this.np);
    }
    stop() {
        return this.player.stop();
    }
    async move(from, to) {
        if (to >= this.next.length) {
            let k = to - this.next.length + 1;
            while (k--) {
                this.next.push(undefined);
            }
        }
        this.next.splice(to, 0, this.next.splice(from, 1)[0]);
        return this.next;
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
