import { Guild } from "discord.js";

const queues: Queue[] = [];

export class Queue {
  guild: Guild;
  queue: object[];
  constructor(guild: Guild) {
    this.guild = guild;
    this.queue = [];
  }
  _init() {
    queues.push(this);
  }
  removeSong(position = 0) {
    return new Promise((resolve, reject) => {
      if (!this.queue[position]) return reject(false);
      resolve(true)
      this.queue.splice(position, 1);
    });
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