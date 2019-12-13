"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const queues = [];
class Queue {
    constructor(guild) {
        this.guild = guild;
        this.queue = [];
    }
    _init() {
        queues.push(this);
        return this;
    }
    addSong(data) {
        this.queue.push(data.tracks[0]);
    }
    removeSong(position = 0) {
        if (!this.queue[position])
            return;
        if (position === 0) {
            this.queue.shift();
            return;
        }
        this.queue = this.queue.splice(position, 1);
    }
    nextSong() {
        return this.queue[0] || null;
    }
    static getQueue(guild) {
        return queues.find((queue) => queue.guild.id === guild.id) || undefined;
    }
    delete() {
        queues.splice(queues.findIndex((x) => x.guild.id === this.guild.id), 1);
    }
}
exports.Queue = Queue;
;
