"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Queue {
    constructor(player) {
        this.player = player;
        this.next = [];
    }
    addSong(tracks) {
        this.next.push(tracks[0]);
    }
    removeSong(position = 0) {
        if (!this.next[position])
            return;
        if (position === 0) {
            this.next.shift();
            return;
        }
        this.next = this.next.splice(position, 1);
    }
    nextSong() {
        return this.next[0] || null;
    }
}
exports.Queue = Queue;
;
