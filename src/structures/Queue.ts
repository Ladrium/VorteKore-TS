import { Guild } from "discord.js";

const queues: Queue[] = [];

export class Queue {
  guild: Guild;
  queue: any[];
  constructor(guild: Guild) {
    this.guild = guild;
    this.queue = [];
  }
  _init() {
    queues.push(this);
    return this;
  }
  addSong(data: any) {
    this.queue.push(data.tracks[0]);
  }
  removeSong(position = 0) {
    if (!this.queue[position]) return;
    if (position === 0) {
      this.queue.shift();
      return;
    }
    this.queue = this.queue.splice(position, 1);
  }
  nextSong() {
    return this.queue[0] || null;
  }
  static getQueue(guild: Guild) {
    return queues.find((queue) => queue.guild.id === guild.id) || undefined;
  }
  delete() {
    queues.splice(queues.findIndex((x) => x.guild.id === this.guild.id), 1)
  }
};