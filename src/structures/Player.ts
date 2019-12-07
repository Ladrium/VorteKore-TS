import { VorteClient } from "./VorteClient";
import { PlayerManager } from "discord.js-lavalink";
import { get } from "../util";
import { Queue } from "./Queue";

export class Player {
  node: any;
  bot: VorteClient;
  lavalink?: PlayerManager;
  queue: typeof Queue;
  constructor(node: any, bot: VorteClient) {
    this.node = node;
    this.bot = bot;
    this.lavalink; 
    this.queue = Queue;
  }
  getSongs(query: string) {
    const output = get(`http://${this.node.host}:${this.node.port}/loadtracks?identifier=ytsearch%3A${encodeURIComponent(query)}`,
      { headers: { Authorization: this.node.password } });
    return output;
  }
  _init() {
    this.lavalink = new PlayerManager(this.bot, this.node, {
      user: this.bot.user!.id,
      shards: 0
    });
  }
}